import React, { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@//ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showFileSelected?: boolean;
}

export const DragnDrop: React.FC<FileUploadProps> = ({
  showFileSelected = false,
  onChange,
  ...props
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      setFiles(Array.from(droppedFiles));
    }

    if (onChange) {
      const fakeEvent = {
        target: {
          files: droppedFiles,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(fakeEvent);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div
          className={`flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-md transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-gray-400 mb-4" />

          <p className="font-bold text-md text-gray-700">
            Arraste e solte os arquivos aqui
          </p>
          <p className="font-bold text-md text-gray-700">ou</p>
          <Button
            variant="link"
            asChild
            onClick={() =>
              document.getElementById(props.id || "fileUpload")?.click()
            }
            className="text-primary"
          >
            <label htmlFor="fileUpload">Procurar no computador</label>
          </Button>

          <p className="mt-4 text-xs text-gray-500">
            Arquivos suportados: JPEG, PNG, MP4
          </p>
          <Input
            {...props}
            id={props.id || "fileUpload"}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          {showFileSelected && files.length > 0 && (
            <div className="mt-4 w-full">
              {files.map((file) => (
                <p
                  key={file.name}
                  className="text-md font-semibold text-gray-700 text-center"
                >
                  {file.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
