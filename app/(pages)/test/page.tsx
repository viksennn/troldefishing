"use client";

import { UploadButton } from "@/app/components/uploadthing/uploadthing";

export default function Home() {
    return (
        <div>
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");

            }}
            onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
        }}
      />
        </div>
    );
}
