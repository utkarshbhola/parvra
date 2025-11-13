import { useState } from "react";
import Sidebar from "./components/sidebar";
import SlidePanel from "./components/Sidepanel";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import CreatePopup from "./components/CreatePopUp";
import FriendsPanel from "./components/FriendsPanel";
import CommunitiesPanel from "./components/Communitiespanel";
import EventsPanel from "./components/EventsPanel";

export default function App() {
  const [activePanel, setActivePanel] = useState(null);

  const getPanelContent = () => {
    switch (activePanel) {
      case "communities":
        return <CommunitiesPanel />;
      case "events":
        return <EventsPanel />;
      case "friends":
        return <FriendsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />

      {/* 👇 Full row containing sidebar, map, and right panel */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />

        <SlidePanel
          isOpen={!!activePanel && activePanel !== "create"}
          onClose={() => setActivePanel(null)}
          content={getPanelContent()}
        />

        {/* 👇 Map section */}
        <div className="flex-1 relative overflow-hidden">
          <MapView />
        </div>

        
      </div>

      {activePanel === "create" && (
        <CreatePopup onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
}
