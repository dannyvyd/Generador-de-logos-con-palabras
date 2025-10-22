
import React from 'react';
import { LogoGenerator } from './components/LogoGenerator';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl">
        <Header />
        <main>
          <LogoGenerator />
        </main>
      </div>
    </div>
  );
};

export default App;
