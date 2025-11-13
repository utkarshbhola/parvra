import { useState } from "react";
import Sidebar from "./components/sidebar";
import SlidePanel from "./components/Sidepanel";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import CreatePopup from "./components/CreatePopUp";
import FriendsPanel from "./components/FriendsPanel";
import CommunitiesPanel from "./components/Communitiespanel";
import EventsPanel from "./components/EventsPanel";
{/*import RightPanel from "./components/RightPanel";*/}

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

      {/* 👇 Make this flex row include sidebar, map, and right panel */}
      <div className="flex flex-1">
        {/* Left sidebar */}
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />

        {/* Slide-in side panel */}
        <SlidePanel
          isOpen={!!activePanel && activePanel !== "create"}
          onClose={() => setActivePanel(null)}
          content={getPanelContent()}
        />

        {/* Center map area */}
        <div className="flex-1 relative">
          <MapView />
        </div>

        {/* 👇 Move the RightPanel inside this main flex row */}
        {/*<RightPanel />*/}
      </div>

      {/* Popup overlay for create */}
      {activePanel === "create" && (
        <CreatePopup onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
}
