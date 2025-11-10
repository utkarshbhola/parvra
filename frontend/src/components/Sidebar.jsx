import { User, Globe, Calendar, Users, Plus } from "lucide-react";

export default function Sidebar({ activePanel, setActivePanel }) {
  const icons = [
    { id: "profile", icon: <User /> },
    { id: "communities", icon: <Globe /> },
    { id: "events", icon: <Calendar /> },
    { id: "friends", icon: <Users /> },
    { id: "create", icon: <Plus /> },
  ];

  return (
    <div className="flex flex-col items-center justify-between bg-gray-900 text-cyan-950 w-16 py-6 h-screen">
      <div className="flex flex-col items-center space-y-6">
        {icons.slice(0, 4).map(({ id, icon }) => (
          <button
            key={id}
            onClick={() => setActivePanel(activePanel === id ? null : id)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              activePanel === id
                ? "bg-yellow-400 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>

      <button
        onClick={() => setActivePanel("create")}
        className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black transition-all"
      >
        <Plus />
      </button>
    </div>
  );
}
