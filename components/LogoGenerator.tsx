import React, { useState, useCallback } from 'react';
import { generateLogoImage } from '../services/geminiService';
import { Spinner } from './Spinner';

export const LogoGenerator: React.FC = () => {
  const [brandName, setBrandName] = useState<string>('Dannyvyd');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!brandName.trim()) {
      setError('Brand name cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateLogoImage(brandName);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [brandName]);
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `${brandName}-logo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
      <div className="space-y-6">
        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-300 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g., Dannyvyd"
            className="w-full bg-gray-900/70 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Spinner />
              Generating...
            </>
          ) : (
            'Generate Logo'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Generated Logo:</h3>
        <div className="w-full aspect-square bg-gray-900/70 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
          {isLoading ? (
            <div className="text-center text-gray-400">
              <Spinner />
              <p className="mt-2">Creating your masterpiece...</p>
            </div>
          ) : generatedImage ? (
            <img src={generatedImage} alt={`${brandName} logo`} className="object-contain w-full h-full" />
          ) : (
            <p className="text-gray-500">Your generated logo will appear here</p>
          )}
        </div>
      </div>
      
      {generatedImage && !isLoading && (
        <div className="mt-6">
          <button
            onClick={handleDownload}
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Download Logo
          </button>
        </div>
      )}
    </div>
  );
};