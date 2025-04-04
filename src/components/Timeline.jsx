// src/components/Timeline.jsx
function Timeline({ recordings, onSelectRecording }) {
    // Group recordings by date
    const groupedRecordings = recordings.reduce((groups, recording) => {
      const date = new Date(recording.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(recording);
      return groups;
    }, {});
    
    return (
      <div className="timeline">
        <h2>Reverse Diary</h2>
        
        {Object.entries(groupedRecordings).map(([date, dayRecordings]) => (
          <div key={date} className="timeline-day">
            <h3 className="day-header">{date}</h3>
            
            <div className="day-recordings">
              {dayRecordings
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map(recording => (
                  <div 
                    key={recording.id} 
                    className="recording-item"
                    onClick={() => onSelectRecording(recording.id)}
                  >
                    <div className="recording-time">
                      {new Date(recording.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    
                    <div className="recording-details">
                      <div className="recording-title">
                        {recording.summary || recording.transcript || 'Untitled Recording'}
                      </div>
                      
                      <div className="recording-meta">
                        <span className="duration">{Math.round(recording.duration)}s</span>
                        {recording.para_category && (
                          <span className="category">{recording.para_category}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Timeline;
  