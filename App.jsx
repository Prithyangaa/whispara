// This is the main application structure for Whispara using Tauri and React

// src/App.jsx - Main React component
import { useState, useEffect, useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/api/fs';
import RecordingControls from './components/RecordingControls';
import TranscriptViewer from './components/TranscriptViewer';
import FolderView from './components/FolderView';
import Timeline from './components/Timeline';
import DailyDigest from './components/DailyDigest';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState(null);
  const [paraFolders, setParaFolders] = useState({
    Projects: [],
    Areas: [],
    Resources: [],
    Archives: []
  });
  const [view, setView] = useState('timeline'); // 'timeline', 'folders', 'digest'
  const [appDataPath, setAppDataPath] = useState('');

  useEffect(() => {
    // Initialize app data directory
    const initApp = async () => {
      const dataDir = await appDataDir();
      setAppDataPath(dataDir);
      
      // Load existing recordings from storage
      loadRecordings();
      
      // Load PARA folders content
      loadParaFolders();
    };
    
    initApp();
  }, []);

  const loadRecordings = async () => {
    try {
      // Invoke Rust function to get recordings
      const loadedRecordings = await invoke('get_recordings');
      setRecordings(loadedRecordings);
    } catch (error) {
      console.error('Failed to load recordings:', error);
    }
  };

  const loadParaFolders = async () => {
    try {
      // Invoke Rust function to get PARA folders content
      const folders = await invoke('get_para_folders');
      setParaFolders(folders);
    } catch (error) {
      console.error('Failed to load PARA folders:', error);
    }
  };

  const startRecording = async () => {
    try {
      await invoke('start_recording');
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const recordingInfo = await invoke('stop_recording');
      setIsRecording(false);
      
      // Start transcription process
      const transcriptResult = await invoke('transcribe_audio', { 
        filePath: recordingInfo.filePath 
      });
      
      // Start summarization
      const summary = await invoke('summarize_transcript', { 
        transcript: transcriptResult.text 
      });
      
      // Auto-file to PARA
      const paraCategory = await invoke('categorize_for_para', { 
        transcript: transcriptResult.text,
        summary: summary
      });
      
      // Update UI with new data
      loadRecordings();
      loadParaFolders();
      
      setCurrentTranscript({
        text: transcriptResult.text,
        summary: summary,
        category: paraCategory,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in recording workflow:', error);
    }
  };

  const viewTranscript = async (recordingId) => {
    try {
      const transcript = await invoke('get_transcript', { recordingId });
      setCurrentTranscript(transcript);
    } catch (error) {
      console.error('Failed to load transcript:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Whispara</h1>
        <div className="view-controls">
          <button onClick={() => setView('timeline')}>Timeline</button>
          <button onClick={() => setView('folders')}>PARA Folders</button>
          <button onClick={() => setView('digest')}>Daily Digest</button>
        </div>
      </header>
      
      <main className="app-content">
        <RecordingControls 
          isRecording={isRecording} 
          onStartRecording={startRecording} 
          onStopRecording={stopRecording} 
        />
        
        {view === 'timeline' && (
          <Timeline 
            recordings={recordings} 
            onSelectRecording={viewTranscript} 
          />
        )}
        
        {view === 'folders' && (
          <FolderView 
            folders={paraFolders} 
            onSelectItem={viewTranscript} 
          />
        )}
        
        {view === 'digest' && (
          <DailyDigest />
        )}
        
        {currentTranscript && (
          <TranscriptViewer transcript={currentTranscript} />
        )}
      </main>
    </div>
  );
}

export default App;