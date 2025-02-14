# Crickulator

## Overview
The **Crickulator** is a web-based application that simulates entire cricket matches ball by ball using probability models and user interactions. Initially built using Python and Flask with an SQLite database, the project is now being transitioned to a JavaScript-based web application for better interactivity and scalability.

## Live Demo
Check out the live version of eCricket Simulator: [[https://crickulator.vercel.app/](https://crickulator.vercel.app/)].

## Features
- Simulates full cricket matches ball by ball.
- Uses probability models to determine match outcomes dynamically.
- User interaction allows decision-making for team strategies.
- Stores and updates match scores and statistics in real time.
- Web-based UI for enhanced user experience.

## Tech Stack
- **Frontend:** JavaScript (React with Vite)
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB (for match data storage)
- **Version Control:** Git & GitHub

## Installation
### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Avngrstark62/Cricket-Simulator.git
   cd Cricket-Simulator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the project:
   ```sh
   npm run build
   ```
4. Start the backend:
   ```sh
   npm run dev
   ```
5. Update `baseURL` in `frontend/api/api.js` to match your backend's localhost URL. If your backend is running on port 5000, set:
   ```js
   const baseURL = "http://localhost:5000";
   ```
6. From the frontend root, build the frontend:
   ```sh
   npm run build
   ```
7. Start the frontend:
   ```sh
   npm run dev
   ```
8. Open your browser and go to the frontend URL to access the app.

## Future Enhancements
- Improve probability model for realistic match simulation.
- Implement multiplayer mode.
- Add player and team customization.
- Integrate machine learning for AI-driven gameplay decisions.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.
