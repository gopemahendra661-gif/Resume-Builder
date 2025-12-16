import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { AdsterraBanner } from './AdsterraBanner';

interface AdsterraPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdsterraPopup: React.FC<AdsterraPopupProps> = ({ isOpen, onClose }) => {
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      setCountdown(3);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full relative flex flex-col items-center border border-gray-200 dark:border-gray-700 transform scale-100 transition-all">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Advertisement</span>
          {canClose ? (
            <button 
              onClick={onClose}
              className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold hover:bg-red-200 transition-colors"
            >
              Close <X size={14} />
            </button>
          ) : (
            <span className="text-xs text-gray-500 font-medium flex items-center">
              <Loader2 size={12} className="animate-spin mr-1" />
              Skip in {countdown}s
            </span>
          )}
        </div>

        {/* Ad Container (300x250) */}
        <div className="w-[300px] h-[250px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-700">
          <AdsterraBanner 
            width={300}
            height={250}
            scriptUrl="https://www.highperformanceformat.com/cb37274d5222fca22d7f3caca580e3d2/invoke.js"
            atOptions={{
              'key' : 'cb37274d5222fca22d7f3caca580e3d2',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            }}
          />
        </div>

        <button 
          onClick={onClose} 
          disabled={!canClose}
          className={`w-full py-3 rounded-xl font-bold transition-all ${
            canClose 
              ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-primary-500/30" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {canClose ? "Continue to Site" : "Please Wait..."}
        </button>
      </div>
    </div>
  );
};
