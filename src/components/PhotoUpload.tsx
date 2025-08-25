import React, { useRef, useState } from 'react';
import { Upload, User, X } from 'lucide-react';

interface PhotoUploadProps {
  photo?: string;
  onPhotoChange: (photo: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ photo, onPhotoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onPhotoChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onPhotoChange('');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`relative w-32 h-32 rounded-full border-2 border-dashed cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : photo
            ? 'border-gray-300'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            {isDragging ? (
              <Upload size={24} className="animate-bounce" />
            ) : (
              <User size={24} />
            )}
            <span className="text-xs mt-2 text-center px-2">
              {isDragging ? 'Drop photo here' : 'Add photo'}
            </span>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
      
      <p className="text-sm text-gray-600 text-center">
        Click or drag to upload your photo<br />
        <span className="text-xs text-gray-500">JPG, PNG up to 5MB</span>
      </p>
    </div>
  );
};