# CyberSight - AI-Powered Threat Intelligence Dashboard

## Overview
CyberSight is an AI-powered threat intelligence dashboard that leverages the Gemini API to provide real-time insights into potential security threats. The application is designed to help security professionals monitor, analyze, and respond to threats effectively.

## Project Structure
The project is divided into two main parts: the client and the server.

```
CyberSight
├── client                # Client-side application
│   ├── public
│   │   └── index.html    # Main HTML file
│   ├── src
│   │   ├── components     # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── Chart.js
│   │   │   └── ThreatList.js
│   │   ├── services       # API service functions
│   │   │   └── api.js
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Entry point for client-side
│   └── package.json       # Client dependencies and scripts
├── server                # Server-side application
│   ├── src
│   │   ├── controllers     # Request handling
│   │   │   └── threatController.js
│   │   ├── routes          # API routes
│   │   │   └── threatRoutes.js
│   │   ├── services        # Interaction with Gemini API
│   │   │   └── geminiService.js
│   │   └── server.js       # Entry point for server-side
│   ├── .env                # Environment variables
│   └── package.json        # Server dependencies and scripts
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/CyberSight.git
   cd CyberSight
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory and add your API keys and other configurations.

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Features
- Real-time threat intelligence data visualization.
- Interactive charts to analyze threat trends.
- Comprehensive list of detected threats with details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Gemini API for providing threat intelligence data.
- React for building the client-side application.
- Express for the server-side framework.