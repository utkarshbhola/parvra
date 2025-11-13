// components/panels/CommunitiesPanel.jsx
export default function CommunitiesPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Communities</h2>
      <ul className="space-y-2">
        <li className="p-2 bg-gray-100 rounded">Local Runners</li>
        <li className="p-2 bg-gray-100 rounded">Civic Volunteers</li>
        <li className="p-2 bg-gray-100 rounded">Environmental Group</li>
      </ul>
    </div>
  );
}
