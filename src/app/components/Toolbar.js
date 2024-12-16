"use client";

export default function Toolbar({ children }) {
  return (
    <div className="flex flex-wrap gap-4 items-start bg-gray-50 p-4 rounded-lg">
      {children}
    </div>
  );
}
