// src/components/TranscriptViewer.jsx
function TranscriptViewer({ transcript }) {
    if (!transcript) return null;
    
    return (
      <div className="transcript-viewer">
        <div className="transcript-header">
          <h3>Transcript</h3>
          <span className="timestamp">{new Date(transcript.timestamp).toLocaleString()}</span>
          {transcript.category && (
            <span className="category-badge">{transcript.category}</span>
          )}
        </div>
        
        {transcript.summary && (
          <div className="summary-section">
            <h4>Summary</h4>
            <p>{transcript.summary}</p>
          </div>
        )}
        
        <div className="transcript-text">
          <h4>Full Transcript</h4>
          <p>{transcript.text}</p>
        </div>
      </div>
    );
  }
  
  export default TranscriptViewer;