// components/panels/EventsPanel.jsx
export default function EventsPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
      <div className="space-y-2">
        <div className="p-3 bg-yellow-50 rounded-lg shadow-sm">
          <p className="font-medium">Marathon 2025</p>
          <p className="text-sm text-gray-600">March 10th, 6 AM</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg shadow-sm">
          <p className="font-medium">Tree Plantation Drive</p>
          <p className="text-sm text-gray-600">March 25th, 8 AM</p>
        </div>
      </div>
    </div>
  );
}
