import React, { forwardRef, useState, useEffect,useRef } from "react";
import { Button } from '../ui/button';
import useGenerateContent from "@/hooks/use-generate-content";

export type Props = {
  url?: string;
  prompt?: string;
  pdf: string;
  language: string;
  setIsModalOpen?: Function;
};

const Modal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { url, prompt, pdf, language, setIsModalOpen } = props;
  const { isPending, isSuccess, isError, data, mutateAsync } = useGenerateContent();
  const isSent = useRef<boolean>(false);
  useEffect(() => {
    const run = async () => {
      if (!isSent.current) {
        await mutateAsync({ language, pdf });
        isSent.current = true;
        await new Promise<void>(res => setTimeout(res, 5000));
        isSent.current = false;
      }
    };
  
    run();
  }, [language, pdf]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-gray/900 flex items-center justify-center transition-opacity duration-300 ease-out"
    >
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-lg shadow-xl transform transition-transform duration-500 ease-in-out animate-fadeInScale">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-primary mb-3">Generated Summary</h3>
        </div>
        
        {/* Loading Spinner */}
        {isPending && (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <p className="ml-4 text-primary text-lg">Generating... ⏳</p>
          </div>
        )}

        {/* Summary Content */}
        {!isPending && (
          <div className="space-y-4">
            <div className="mb-4">
              <h4 className="font-semibold text-xl text-foreground">Summary:</h4>
              <div className="max-h-80 overflow-x-auto p-3 border border-border scrollbar-custom rounded-lg bg-background/50">
                <p className="text-lg text-muted-foreground break-words">
                {data?.summary}
                </p>
              </div>
            </div>

            {data?.mp3 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-xl text-foreground">Audio:</h4>
                <audio controls src={data?.mp3} className="w-full rounded-full bg-[#353535]"></audio>
              </div>
            )}
            <div className="flex gap-4 justify-evenly">
      {/* Download summary as .txt */}
      <Button
        className="bg-primary hover:bg-primary/90"
        onClick={() => {
          const blob = new Blob([data?.summary || ''], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'summary.txt';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }}
      >
        Download Summary (.txt)
      </Button>

      {/* Download MP3 */}
      <Button
        className="bg-purple-500 hover:bg-purple-600"
        onClick={() => {
          if (!data?.mp3) return;
          const a = document.createElement('a');
          a.href = data.mp3; // Should be a direct link to your MP3 file
          a.download = 'summary.mp3';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
      >
        Download MP3
      </Button>
    </div>
          </div>
        )}

        {/* Error Handling */}
        {isError && (
          <div className="text-center mt-4">
            <p className="text-red-500 text-lg font-medium">Something went wrong. Please try again.</p>
          </div>
        )}
    
        {/* Close Button */}
        <Button
          className="mt-6 w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
          onClick={() => setIsModalOpen?.(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;
