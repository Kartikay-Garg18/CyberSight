# 🛡️ CyberSight — AI-Powered Threat Intelligence Platfrom/SDK

[![stars](https://img.shields.io/github/stars/Kartikay-Garg18/CyberSight?style=flat-square)](https://github.com/Kartikay-Garg18/CyberSight/stargazers) [![issues](https://img.shields.io/github/issues/Kartikay-Garg18/CyberSight?style=flat-square)](https://github.com/Kartikay-Garg18/CyberSight/issues) [![license](https://img.shields.io/github/license/Kartikay-Garg18/CyberSight?style=flat-square)](https://github.com/Kartikay-Garg18/CyberSight)

> An affordable, AI-powered threat intelligence platform/SDK that ingests logs in real-time, detects suspicious behaviour using Gemini AI, and presents actionable recommendations.

## Problem Statement

In today’s digital world, small and medium-scale organizations face increasing cybersecurity threats such as brute-force attacks, unauthorized access, and data exfiltration. Most existing threat monitoring systems like Splunk or CrowdStrike are expensive, complex, and difficult to deploy.

There’s a need for an affordable, AI-powered, and easy-to-understand solution that helps organizations detect and understand security threats in real-time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo & Presentation](#demo--presentation)
- [Quick Start](#quick-start)
- [Development](#development)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time log monitoring and alerting.
- AI-based threat detection and natural-language summaries (Open AI).
- Interactive dashboard with charts and geo-IP mapping.
- WebSocket-backed live updates and instant notifications.

## Tech Stack

| Layer      | Technology                                   |
|------------|---------------------------------------------|
| Frontend   | React, Vite, TailwindCSS, Recharts, Socket.IO-client |
| Backend    | Node.js, Express, Socket.IO, Drizzle ORM    |
| Database   | PostgreSQL|
| AI / ML    | Open AI API (via @openrouter/sdk) |
| Hosting    | Vercel (frontend), Render (backend), Neon (DB) |

## Demo & Presentation

- **Live Demo**: [CyberSight](https://cyber-sight.vercel.app/)
- **Presentation**: [Canva Presentation](https://www.canva.com/design/DAG4JUKAeKE/OcDUxPhWnnm6EM3V-iBrOQ/)

## Quick Start

Follow these steps to set up and run the project locally:

1. **Install Dependencies**:

   ```powershell
   npm install
   ```

2. **Start the Application**:

   ```powershell
   npm run dev
   ```

   Alternatively, you can start the client and server separately:

   - **Client**:

     ```powershell
     cd client
     npm install
     npm run dev
     ```

   - **Server**:

     ```powershell
     cd server
     npm install
     npm run dev
     ```

## Development

- **Linting and Tests**: Not configured yet. Consider adding ESLint, Prettier, and a test runner.
- **Database Migrations**: Run `node migrate.js` (server includes a `migrate` script).

## Team Members

| Name             | Role                                   | Work Done                                                                 |
|------------------|---------------------------------------|---------------------------------------------------------------------------|
| Rishabh Saraswat | Backend Developer                     | Designed and developed backend APIs, implemented log ingestion, detection logic, and database structure. |
| Kartikay Garg    | Frontend & AI Integration Developer   | Built the React dashboard, connected real-time WebSocket updates, and integrated Gemini AI for intelligent threat detection. |

## Contributing

Contributions are welcome! Please open an issue first to discuss major changes.

## License

This project is licensed under the ISC License. See the `package.json` for details.

---

_Last updated: November 9, 2025_
