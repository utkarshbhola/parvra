// App.jsx
import { useState } from "react";
import Sidebar from "./components/sidebar";
import SlidePanel from "./components/Sidepanel";
import SearchBar from "./components/SearchBar";
import MapView from "./components/mapView";

export default function App() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar
        onIconClick={(id) =>
          setActivePanel(activePanel === id ? null : id)
        }
      />
      <SlidePanel
        isOpen={!!activePanel}
        onClose={() => setActivePanel(null)}
        content={<p>{activePanel} content here...</p>}
      />
      <div className="flex-1 relative">
        <SearchBar />
        <MapView />
      </div>
    </div>
  );
}
