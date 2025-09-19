import React from "react";
interface LayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}
export function Layout({ left, right }: LayoutProps) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lado esquerdo */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full overflow-auto border-r border-gray-300">
        {left}
      </div>
      {/* Lado direito */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full overflow-auto">
        {right}
      </div>
    </div>
  );
}
