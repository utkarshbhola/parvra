// components/RightPanel.jsx
import { MessageSquare } from "lucide-react";
import * as framerMotion from "framer-motion";

const { motion } = framerMotion;

export default function RightPanel() {
  const recommendations = [
    { id: 1, user: "Amit", text: "Dude Bhogal's ke chole bhature was so awesome!" },
    { id: 2, user: "Riya", text: "District9 has the best sports vibe!" },
    { id: 3, user: "Vikram", text: "Try the new coffee place near central park — totally worth it ☕" },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-inner h-full overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
        <MessageSquare className="text-yellow-500" /> Recommendations
      </h2>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="p-3 bg-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <p className="text-gray-700 font-medium">{rec.text}</p>
            <p className="text-sm text-gray-500 mt-1">– {rec.user}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
