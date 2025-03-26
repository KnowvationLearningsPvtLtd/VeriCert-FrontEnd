const PageWrapper = ({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) => {
    return (
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <div className="mt-6 bg-white p-4 shadow rounded-lg">{children}</div>
      </div>
    );
  };
  
  export default PageWrapper;
  