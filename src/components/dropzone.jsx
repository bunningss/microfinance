"use client";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

export function ImageDropzone({ className, file, setFile }) {
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      try {
        const res = await edgestore.publicImages.upload({
          file,
          options: {
            temporary: true,
          },
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        setFile(res.url);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "h-36 w-full border border-input border-dashed rounded-md flex items-center justify-center",
          className
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
      {file && (
        <figure className="relative w-32 h-32 border border-input border-dashed rounded-md overflow-hidden">
          <Image
            src={file}
            alt="user image"
            fill
            sizes="100px"
            className="object-cover"
          />
        </figure>
      )}
      {progress > 0 && <Progress value={progress} className="w-32" />}
    </div>
  );
}
