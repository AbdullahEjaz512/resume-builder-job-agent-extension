# All-in-One Job Agent Chrome Extension

A browser extension that automates your job search: build resumes, auto-apply to LinkedIn jobs, and analyze your resume fit with AI—all in one place.

---

## Features

- **Resume Builder Wizard:** Step-by-step resume creation with professional formatting
- **Resume Upload:** Use your own PDF, DOCX, or TXT resume
- **Auto-Apply Agent:** Automatically searches and applies to jobs on LinkedIn (Easy Apply)
- **Resume Score Checker:** AI-powered analysis against job descriptions
- **Local AI Integration:** Uses Ollama for cover letter generation, screening question answers, and resume scoring (privacy-first, no cloud APIs)

---

## Screenshots
![Home page of extension](image.png)
![create or edit existing  resume](image-1.png)
![upload resume](image-2.png)
![Resume score checker](image-3.png)
![Auto apply agent](image-4.png)


---

## Tech Stack

- **React 18 + TypeScript** (UI)
- **Tailwind CSS** (Glassmorphism design)
- **Zustand** (State management, Chrome storage persistence)
- **Vite + @crxjs/vite-plugin** (Extension bundling)
- **docx** (Resume generation)
- **Ollama** (Local LLM for AI features)
- **Chrome Extension Manifest V3**

---

## Installation (Local Development)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/AbdullahEjaz512/resume-builder-job-agent-extension.git
   cd all-in-one-job-agent-extension
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build the extension:**
   ```bash
   npm run build
   ```
4. **Load in Chrome:**
   - Go to `chrome://extensions`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `dist/` folder

5. **(Optional) Enable AI features:**
   - [Install Ollama](https://ollama.com/download)
   - Download a model (e.g., `llama3`)
   - Start Ollama (`ollama serve`)
   - Extension will connect to `http://localhost:11434`

---

## Usage

- Open the extension popup
- Choose an action: Build Resume, Upload Resume, Auto-Apply, Score Resume
- Follow the guided steps
- For auto-apply, enter job title/location and let the agent do the work

---

## Architecture

- **Popup UI:** Main navigation and actions
- **Background Script:** Handles automation and message passing
- **Content Scripts:** Interact with LinkedIn pages for scraping and applying
- **State Management:** Profile data stored in Chrome Storage via Zustand
- **AI Integration:** Prompts sent to Ollama for cover letters, answers, and scoring

---

## Contributing

Pull requests are welcome!  
Please open an issue for major changes.

---

## License

MIT

---

## Credits

- [Ollama](https://ollama.com/) for local LLM
- [docx](https://github.com/dolanmiu/docx) for document generation
- [Tailwind CSS](https://tailwindcss.com/) for UI styling

---

## Contact

For questions or support, open an issue or email [abdullahejaz512@gmail.com](mailto:abdullahejaz512@gmail.com).