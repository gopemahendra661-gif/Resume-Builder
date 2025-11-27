import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfParser';
import { extractTextFromDOCX } from '../utils/docParser';
import { clsx } from 'clsx';

interface FileUploaderProps {
  onTextExtracted: (text: string, fileName: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onTextExtracted }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromDOCX(file);
      } else {
        throw new Error('Unsupported file type. Please use PDF or DOCX.');
      }
      
      if (text.trim().length < 50) {
        throw new Error('Could not extract enough text. The file might be an image-based PDF.');
      }

      onTextExtracted(text, file.name);
    } catch (err: any) {
      setError(err.message || 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
          isDragOver
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10"
            : "border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-400",
          isLoading && "opacity-50 pointer-events-none"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.docx"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Analyzing your resume...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-4">
              <UploadCloud size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Click to upload or drag & drop
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Supports PDF and DOCX formats. Files are processed locally in your browser.
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}
    </div>
  );
};
