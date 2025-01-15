import { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function FileUpload({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-[#2861eb] bg-[#2861eb]/5' : 'border-gray-300'
      }`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-[#2861eb]/10 rounded-full">
          <CloudArrowUpIcon className="h-10 w-10 text-[#2861eb]" />
        </div>
        <div>
          <p className="text-lg font-medium text-gray-900">
            Drag and drop your file here
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to browse from your computer
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Supported formats: PDF, DOCX, TXT (max 10MB)
        </div>
      </div>
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileSelect}
        accept=".pdf,.docx,.txt"
      />
    </div>
  );
}
