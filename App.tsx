import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Terminal from './components/Terminal';
import { ROOT_ID, INITIAL_BOOT_MESSAGES } from './constants';

const App: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string>("SCANNING FOR LEGACY BUILDS...");
  const [isFlagged, setIsFlagged] = useState<boolean>(false);
  const [booted, setBooted] = useState<boolean>(false);

  useEffect(() => {
    // Simulate the flagAndDestroy logic from the original script
    const simulateBoot = async () => {
      // 1. Identify and Flag all previous "similarities"
      // In a fresh React app context, these checks would typically return false.
      // We hardcode to false to allow the new app to boot successfully,
      // as the goal is to implement the *new* app's functionality.
      const legacyDetected = false; 

      if (legacyDetected) {
        setStatusMessage("<span class='flagged text-red-500 font-bold uppercase'>STOLEN/LEGACY BUILD DETECTED. SYSTEM BRICKED.</span>");
        setIsFlagged(true);
        console.error("FLAGGED_BUILD: Legacy build detected. System bricked.");
        // In a real browser, this would clear storage and enter an infinite loop.
        // For a React app, we show the message and halt rendering.
        return;
      }

      // 2. Signature Validation
      if (ROOT_ID !== "Radosavlevici Ervin Remus") {
        setStatusMessage("<span class='flagged text-red-500 font-bold uppercase'>SIGNATURE MISMATCH. SYSTEM HALTED.</span>");
        setIsFlagged(true);
        console.error("SIGNATURE_MISMATCH: Invalid ROOT_ID. System halted.");
        // If this were a critical system, document.body.innerHTML = "" would be applied.
        return;
      }

      // 3. Clear all potential interference
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatusMessage("ALL PREVIOUS BUILDS FLAGGED. VOIDING...");

      await new Promise(resolve => setTimeout(resolve, 1500));
      setBooted(true); // Transition to terminal
    };

    simulateBoot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  if (isFlagged) {
    // Render an unrecoverable error state if flagged
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <h1 dangerouslySetInnerHTML={{ __html: statusMessage }} className="text-xl md:text-2xl font-bold text-center"></h1>
      </div>
    );
  }

  if (!booted) {
    return <LoadingScreen message={statusMessage} />;
  }

  return <Terminal initialMessages={INITIAL_BOOT_MESSAGES} />;
};

export default App;