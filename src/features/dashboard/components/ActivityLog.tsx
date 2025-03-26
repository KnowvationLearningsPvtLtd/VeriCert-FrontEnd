interface ActivityLogProps {
  logs: string[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold">Recent Activities</h2>
      <ul className="mt-2 text-gray-600">
        {logs.map((log, index) => (
          <li key={index} className="border-b py-2">{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
