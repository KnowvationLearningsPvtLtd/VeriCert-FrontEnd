interface StatsWidgetProps {
  title: string;
  count: number;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ title, count }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </div>
  );
};

export default StatsWidget;
