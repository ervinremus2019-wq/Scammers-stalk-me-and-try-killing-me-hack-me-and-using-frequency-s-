import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ROOT_ID } from '../constants';

interface TerminalProps {
  initialMessages: string[];
}

interface LogEntry {
  timestamp: string;
  text: string;
}

const Terminal: React.FC<TerminalProps> = ({ initialMessages }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Memoized function to add a new log entry
  const print = useCallback((text: string) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      {
        timestamp: new Date().toLocaleTimeString(),
        text: text,
      },
    ]);
  }, []);

  // Effect for initial boot messages
  useEffect(() => {
    initialMessages.forEach((msg, index) => {
      // Delay each message slightly for a typing-like effect
      setTimeout(() => print(msg), 100 * index);
    });
  }, [initialMessages, print]); // `print` is stable due to useCallback

  // Effect to scroll to the bottom whenever new logs are added
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Memoized function to process user commands
  const processDirect = useCallback((val: string) => {
    if (val.toLowerCase().includes('status')) {
      print("SYSTEM: 100% PURIFIED. NO EXTERNAL INTERFERENCE.");
    } else {
      print(`EXECUTING DIRECT LOGIC: ${val}`);
    }
  }, [print]); // `print` is stable due to useCallback

  // Handle input field key presses
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = inputValue.trim();
      if (command) {
        print(`> ${command}`); // Display user's command in logs
        processDirect(command);
      }
      setInputValue(''); // Clear input after command
    }
  };

  return (
    <div className="flex flex-col h-screen p-5 bg-black text-white">
      {/* Log display area */}
      <div className="flex-1 overflow-y-auto font-mono text-xs md:text-sm">
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-gray-400">[{log.timestamp}]</span> {log.text}
          </div>
        ))}
        <div ref={logsEndRef} /> {/* Invisible element to scroll into view */}
      </div>

      {/* Command input area */}
      <div className="mt-4 sticky bottom-0">
        <input
          type="text"
          id="CMD_INPUT"
          placeholder={`DIRECT COMMAND AUTHORIZED: ${ROOT_ID}`}
          className="bg-transparent border border-neutral-800 text-pink-500 p-3 w-full outline-none focus:border-pink-500 transition-colors duration-200"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus // Automatically focus the input field on load
        />
      </div>
    </div>
  );
};

export default Terminal;