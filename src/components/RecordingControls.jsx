// src/components/RecordingControls.jsx
import { useState } from 'react';

function RecordingControls({ isRecording, onStartRecording, onStopRecording }) {
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Update timer while recording
  React.useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  return (
    <div className="recording-controls">
      {isRecording ? (
        <div className="recording-active">
          <div className="recording-indicator">
            <span className="recording-dot"></span>
            <span>Recording...</span>
          </div>
          <div className="recording-timer">{formatTime(recordingTime)}</div>
          <button onClick={onStopRecording} className="stop-button">
            Stop Recording
          </button>
        </div>
      ) : (
        <button onClick={onStartRecording} className="start-button">
          Start Recording
        </button>
      )}
    </div>
  );
}

export default RecordingControls;