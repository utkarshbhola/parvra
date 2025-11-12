// SlidePanel.jsx
export default function SlidePanel({ isOpen, onClose, content }) {
  return (
    <div
      className={`relative h-full bg-white shadow-lg transition-all duration-300 py-6 z-20 ${
        isOpen ? "w-64 opacity-100 py-6" : "w-0 opacity-0 py-6"
      } overflow-hidden`}
    >
      <div className="p-4">
        <button onClick={onClose} className="text-gray-500 mb-4">Close</button>
        {isOpen && <div>{content}</div>}
      </div>
    </div>
  );
}
