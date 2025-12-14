import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import jwt from "jsonwebtoken";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(({ req }) => {
      const token = req.headers.get("x-upload-token");
      if (!token) throw new UploadThingError("Unauthorized");

      try {
        const payload = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as {
          sub: string;
          role: string;
          purpose: string;
        };

        if (payload.purpose !== "upload") {
          throw new Error("Invalid token purpose");
        }

        return { userId: payload.sub };
      } catch {
        throw new UploadThingError("Invalid upload token");
      }
    })
    .onUploadComplete(({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
