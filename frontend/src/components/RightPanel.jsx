// components/RightPanel.jsx
import { MessageSquare } from "lucide-react";

export default function RightPanel() {
  const recommendations = [
    {
      id: 1,
      user: "Amit",
      text: "Dude Bhogal's ke chole bhature was so awesome!",
    },
    {
      id: 2,
      user: "Riya",
      text: "District9 has the best sports vibe!",
    },
    {
      id: 3,
      user: "Vikram",
      text: "Try the new coffee place near central park — totally worth it ☕",
    },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-inner h-full overflow-y-auto p-4 animate-fadeIn">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
        <MessageSquare className="text-yellow-500" /> Recommendations
      </h2>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="p-3 bg-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
          >
            <p className="text-gray-700 font-medium">{rec.text}</p>
            <p className="text-sm text-gray-500 mt-1">– {rec.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
