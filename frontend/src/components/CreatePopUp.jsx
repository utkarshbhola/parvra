import { useState } from "react";
import { X } from "lucide-react";

export default function CreatePopup({ onClose }) {
  const [type, setType] = useState("event");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="text-gray-500 hover:text-black" />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Create {type === "event" ? "Event" : "Community"}
        </h2>

        {/* Type selector */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setType("event")}
            className={`px-4 py-2 rounded-lg ${
              type === "event" ? "bg-yellow-400" : "bg-gray-100"
            }`}
          >
            Event
          </button>
          <button
            onClick={() => setType("community")}
            className={`px-4 py-2 rounded-lg ${
              type === "community" ? "bg-yellow-400" : "bg-gray-100"
            }`}
          >
            Community
          </button>
        </div>

        <form className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Name / Title" />
          <textarea className="w-full border p-2 rounded" placeholder="Description" />
          <input className="w-full border p-2 rounded" placeholder="Location" />

          {type === "event" && (
            <>
              <input type="datetime-local" className="w-full border p-2 rounded" />
              <input type="number" className="w-full border p-2 rounded" placeholder="Price (₹)" />
              <input type="number" className="w-full border p-2 rounded" placeholder="Max participants (optional)" />
            </>
          )}

          {type === "community" && (
            <>
              <input className="w-full border p-2 rounded" placeholder="Category / Tag" />
              <textarea className="w-full border p-2 rounded" placeholder="Rules / Guidelines" />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded-lg"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
