🎙️ Whispara

Record everything. Forget nothing. File what matters.

Whispara is an offline-first productivity app that records, transcribes, summarizes, and organizes your audio notes using the PARA method (Projects, Areas, Resources, Archives).
✨ Features

Voice Recording: Capture audio notes on your desktop
Local Transcription: Convert speech to text using Whisper.cpp running locally
AI Summarization: Generate concise summaries with on-device NLP
PARA Organization: Auto-sort notes into the right folders
Reverse Diary: View your day's highlights in a timeline
Daily Digest: Get a summary of your day's key points
Privacy-First: Works 100% offline with no cloud processing
Cross-Platform: Available for macOS and Windows

🚀 Getting Started
Prerequisites

Windows 10/11 or macOS 10.14+
4GB RAM minimum (8GB+ recommended)
500MB free disk space

Installation

Download the latest release for your platform:

Windows (.exe)
macOS (.dmg)


Run the installer and follow the on-screen instructions
Launch Whispara and start recording!

🧠 How It Works

Record: Start recording your thoughts, meetings, or ideas
Transcribe: Whispara automatically transcribes your audio using Whisper
Summarize: AI generates a concise summary and extracts key points
Organize: Content is automatically filed into PARA folders
Review: Access your notes in the timeline or folder view

📁 PARA Method
Whispara organizes your notes following the PARA method:

Projects: Active endeavors with deadlines
Areas: Ongoing responsibilities to maintain
Resources: Topics of interest for reference
Archives: Completed or inactive items

🔒 Privacy
Whispara is designed with privacy at its core:

All processing happens on your device
No data is sent to cloud servers
Optional sync via your existing cloud storage providers
Works completely offline

🛠️ Development
Tech Stack

Tauri (Rust + React)
Whisper.cpp for transcription
Local NLP models for summarization
SQLite for local storage

Building from Source
bashCopy# Clone the repository
git clone https://github.com/whispara/whispara.git
cd whispara

# Install dependencies
npm install

# Start development server
npm run tauri dev

# Build for production
npm run tauri build
📝 License
Whispara is open source software under the MIT license.
🙏 Acknowledgments

OpenAI Whisper - Speech recognition model
Tauri - Framework for building lightweight desktop apps
PARA Method - By Tiago Forte
