import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { axiosInstance } from "@/services/api";
const f = createUploadthing();
const auth = async (req: Request) => {
  try {
   const cookieHeader = req.headers.get("access_token");
    if (!cookieHeader) return null;

    const response = await axiosInstance.get("/auth/me", {
      headers: {
        Cookie: cookieHeader, 
      },
    });


    const user = response.data;
    return { id: user.id || user.email || "unknown_user" }
  } catch (error) {
    console.log(error);
    throw new UploadThingError("Unauthorized");
  }
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
