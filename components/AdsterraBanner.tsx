import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface AdBannerProps {
  atOptions?: any;
  scriptUrl?: string;
  width?: number;
  height?: number;
  className?: string;
  closeable?: boolean;
}

export const AdsterraBanner: React.FC<AdBannerProps> = ({ 
  atOptions, 
  scriptUrl, 
  width, 
  height, 
  className,
  closeable = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !isVisible || !atOptions || !scriptUrl) return;

    // Create iframe
    const iframe = document.createElement('iframe');
    
    // Set explicit size to prevent CLS
    iframe.width = width ? `${width}` : '100%';
    iframe.height = height ? `${height}` : 'auto';
    
    // Essential styles for the iframe itself
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.display = 'block';
    iframe.scrolling = 'no';
    
    // Clear container and append iframe
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    // Prepare the HTML content with strict 0 margin/padding body
    const adHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <base target="_blank" />
          <style>
            html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; }
            div, iframe { max-width: 100%; }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            window.atOptions = ${JSON.stringify(atOptions)};
          </script>
          <script type="text/javascript" src="${scriptUrl}"></script>
        </body>
      </html>
    `;

    try {
      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(adHtml);
        doc.close();
      }
    } catch (e) {
      console.error("Adsterra iframe write error:", e);
    }

    return () => {
      // Cleanup not strictly necessary as containerRef.current.innerHTML = '' handles it on re-run,
      // but good practice if component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [atOptions, scriptUrl, isVisible, width, height]);

  if (!isVisible) return null;

  return (
    <div className={`relative flex justify-center items-center ${className}`} style={{ width: width ? width : '100%', height: height ? height : 'auto', minHeight: height }}>
      {closeable && (
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-3 -right-3 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full p-1 shadow-md hover:bg-red-100 hover:text-red-500 transition-colors z-50 border border-gray-300 dark:border-gray-600"
          aria-label="Close Ad"
        >
          <X size={14} />
        </button>
      )}
      <div ref={containerRef} className="flex justify-center items-center w-full h-full overflow-hidden" />
    </div>
  );
};

// Component specifically for the Native Ad (div injection style)
export const AdsterraNative: React.FC = () => {
  const containerId = "container-2b079e38f90b57804cee9c32f597809d";
  const scriptSrc = "https://pl28264163.effectivegatecpm.com/2b079e38f90b57804cee9c32f597809d/invoke.js";

  useEffect(() => {
    // Check if script is already present to prevent duplicates
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);

    return () => {
      // Optional: Cleanup if needed
    };
  }, []);

  return (
    <div className="w-full flex justify-center py-4 my-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg min-h-[250px]">
      <div id={containerId}></div>
    </div>
  );
};
