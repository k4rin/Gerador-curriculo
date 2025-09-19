import React, { useEffect } from "react";
interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}
export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Toast desaparece após 3 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } animate-fadeIn`}
      role="alert"
    >
      {message}
    </div>
  );
}