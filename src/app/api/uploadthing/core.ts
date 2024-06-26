import { createUploadthing, type FileRouter } from "uploadthing/next";
import z from "zod";
import { db } from "@/db";

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async () => {
  
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
