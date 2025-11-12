import { useState } from "react";
import Sidebar from "./components/sidebar";
import SlidePanel from "./components/Sidepanel";
import Navbar from "./components/navbar";
import MapView from "./components/mapView";

export default function App() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      
      <Navbar />

      <div className="flex flex-1">
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />

        <SlidePanel
          isOpen={!!activePanel}
          onClose={() => setActivePanel(null)}
          content={<p>{activePanel} content here...</p>}
        />

        <div className="flex-1 relative">
          
          <MapView />
        </div>
      </div>
    </div>
  );
}
