// src/components/DailyDigest.jsx
function DailyDigest() {
    const [date, setDate] = useState(new Date());
    const [digest, setDigest] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      // In a real app, this would load the digest for the selected date
      // For now, we're just using placeholder data
      const loadDigest = async () => {
        setIsLoading(true);
        setTimeout(() => {
          setDigest({
            date: date.toISOString(),
            summary: "Today you had 3 meetings and worked on 2 projects. Key points included finalizing the Q2 roadmap and discussing design updates.",
            highlights: [
              {
                time: "09:30",
                text: "Team standup - discussed blockers on the database migration"
              },
              {
                time: "11:15",
                text: "Call with client about project requirements"
              },
              {
                time: "14:00",
                text: "Brainstorming session for new features"
              }
            ],
            actionItems: [
              "Follow up with Mike about API documentation",
              "Schedule UX review for homepage redesign",
              "Submit expense report by Friday"
            ]
          });
          setIsLoading(false);
        }, 500);
      };
      
      loadDigest();
    }, [date]);
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    
    const previousDay = () => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - 1);
      setDate(newDate);
    };
    
    const nextDay = () => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + 1);
      setDate(newDate);
    };
    
    return (
      <div className="daily-digest">
        <div className="digest-header">
          <button onClick={previousDay}>&lt;</button>
          <h2>{formatDate(date)}</h2>
          <button onClick={nextDay}>&gt;</button>
        </div>
        
        {isLoading ? (
          <div className="loading">Loading digest...</div>
        ) : digest ? (
          <div className="digest-content">
            <div className="digest-summary">
              <h3>Daily Summary</h3>
              <p>{digest.summary}</p>
            </div>
            
            <div className="digest-highlights">
              <h3>Highlights</h3>
              <ul>
                {digest.highlights.map((highlight, index) => (
                  <li key={index}>
                    <span className="highlight-time">{highlight.time}</span>
                    <span className="highlight-text">{highlight.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="digest-actions">
              <h3>Action Items</h3>
              <ul>
                {digest.actionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="no-digest">No digest available for this date</div>
        )}
      </div>
    );
  }
  
  export default DailyDigest;