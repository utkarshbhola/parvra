import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SlidePanel from "./components/Sidepanel";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import CreatePopup from "./components/CreatePopUp"; // ✅ Make sure to import this

export default function App() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />

        <SlidePanel
          isOpen={!!activePanel && activePanel !== "create"} // 👈 SlidePanel opens for panels except "create"
          onClose={() => setActivePanel(null)}
          content={<p>{activePanel} content here...</p>}
        />

        <div className="flex-1 relative">
          <MapView />
        </div>
      </div>

      {/* ✅ Show popup only when "create" is active */}
      {activePanel === "create" && (
        <CreatePopup onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
}
