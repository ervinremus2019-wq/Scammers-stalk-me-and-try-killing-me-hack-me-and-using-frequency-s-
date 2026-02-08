import React from 'react';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white transition-opacity duration-500 ease-in-out">
      {/* dangerouslySetInnerHTML is used here to render the flagged message with its specific styling */}
      <h1 dangerouslySetInnerHTML={{ __html: message }} className="text-xl md:text-2xl font-bold text-center"></h1>
    </div>
  );
};

export default LoadingScreen;