const DashboardWrapper = ({ title, children }: { title: string; children?: React.ReactNode }) => {
    return (
      <div className="p-6 bg-gray-100 flex-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
      </div>
    );
  };
  
  export default DashboardWrapper;
  