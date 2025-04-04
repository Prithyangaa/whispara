// src/components/FolderView.jsx
function FolderView({ folders, onSelectItem }) {
    const [activeFolder, setActiveFolder] = useState('Projects');
    
    const getFolderContent = () => {
      switch (activeFolder) {
        case 'Projects':
          return folders.projects;
        case 'Areas':
          return folders.areas;
        case 'Resources':
          return folders.resources;
        case 'Archives':
          return folders.archives;
        default:
          return [];
      }
    };
    
    return (
      <div className="folder-view">
        <div className="folder-tabs">
          {['Projects', 'Areas', 'Resources', 'Archives'].map(folder => (
            <button
              key={folder}
              className={`folder-tab ${activeFolder === folder ? 'active' : ''}`}
              onClick={() => setActiveFolder(folder)}
            >
              {folder}
            </button>
          ))}
        </div>
        
        <div className="folder-content">
          <h3>{activeFolder}</h3>
          
          {getFolderContent().length === 0 ? (
            <div className="empty-folder">No items in this folder</div>
          ) : (
            <div className="folder-items">
              {getFolderContent().map(item => (
                <div 
                  key={item.id}
                  className="folder-item"
                  onClick={() => onSelectItem(item.id)}
                >
                  <div className="item-title">
                    {item.summary || item.transcript || 'Untitled Recording'}
                  </div>
                  <div className="item-date">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default FolderView;