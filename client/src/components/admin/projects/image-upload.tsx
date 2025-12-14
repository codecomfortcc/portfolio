"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing"; // The file from Step 5
import { Loader2, UploadCloud, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/services/api";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState(value);

  // 1. Initialize UploadThing Hook
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    headers: async () => {
      const me = await axiosInstance.get("/auth/me");
      return {
        "x-user-id": me.data.email,
      };
    },
    onClientUploadComplete: (res) => {
      const url = res[0].url;
      setPreview(url);
      onChange(url);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    },
    onUploadError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // 2. Setup Dropzone
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        // Create a local preview immediately while uploading
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));

        // Start the actual upload
        startUpload([file]);
      }
    },
    [startUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    multiple: false,
    disabled: disabled || isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setPreview("");
  };

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer h-52 flex items-center justify-center overflow-hidden group
        ${
          isDragActive
            ? "border-indigo-500 bg-indigo-50/50"
            : "border-gray-400/50 hover:border-indigo-400 hover:bg-orange-50/50"
        }
        ${preview ? "border-solid border-gray-200 p-0" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <input {...getInputProps()} />

      {isUploading ? (
        <div className="flex flex-col items-center gap-2 text-indigo-600 animate-pulse z-20 bg-white/80 p-4 rounded-lg">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-sm font-medium">Uploading...</span>
        </div>
      ) : preview ? (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px]">
            <p className="text-white font-medium text-sm flex items-center gap-2">
              <UploadCloud className="w-4 h-4" /> Change
            </p>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto text-orange-600 mb-2 shadow-sm">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-700">
              Click to upload
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG up to 4MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
