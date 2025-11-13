import { X } from "lucide-react";

export default function SlidePanel({ isOpen, onClose, content }) {
  return (
    <div
      className={`relative h-full bg-white shadow-lg transition-all duration-300 z-20 overflow-hidden ${
        isOpen ? "w-64 opacity-100" : "w-0 opacity-0"
      }`}
    >
      {isOpen && (
        <div className="h-full relative">
          {/* ✖️ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="p-6 pt-12">{content}</div>
        </div>
      )}
    </div>
  );
}
