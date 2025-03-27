import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Welcome to the Dashboard!</h1>
        <p className="text-gray-700">You’ve successfully logged in.</p>
      </div>
    </div>
  );
};

export default Home;