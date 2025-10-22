import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center my-8">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
        Dannyvyd Logo Generator
      </h1>
      <p className="mt-3 text-lg text-gray-400">
        Create a high-status fashion logo with AI.
      </p>
    </header>
  );
};
