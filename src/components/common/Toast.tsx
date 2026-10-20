import React from 'react';
import { Check, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-xs pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2.5 bg-[#191927] text-white rounded-lg shadow-lg text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-150"
          role="status"
        >
          {toast.type === 'info' ? (
            <Info className="w-3.5 h-3.5 text-[#A9C9F5] shrink-0" />
          ) : (
            <Check className="w-3.5 h-3.5 text-[#08C83D] shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-[#8E8EA0] hover:text-white ml-1 p-0.5"
            aria-label="Dismiss notice"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
