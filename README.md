👇

🛡️ CyberSight — AI-Powered Threat Intelligence Dashboard
🧩 Problem Statement

In today’s digital world, small and medium-scale organizations face increasing cybersecurity threats such as brute-force attacks, unauthorized access, and data exfiltration.
Most existing threat monitoring systems like Splunk or CrowdStrike are expensive, complex, and difficult to deploy.

There’s a need for an affordable, AI-powered, and easy-to-understand solution that helps organizations detect and understand security threats in real-time.

🚀 Solution Overview

CyberSight is an AI-powered Threat Intelligence Dashboard that analyzes system logs in real-time to detect anomalies, generate alerts, and provide plain-language explanations for each threat.

Our system leverages Gemini AI to identify suspicious patterns such as multiple failed login attempts, unusual access from foreign IPs, or abnormal data transfers — then automatically classifies them into severity levels (Low, Medium, High) and recommends actions.

🔑 Key Features

⚡ Real-time Log Monitoring: Continuously receives logs from systems or agents.

🧠 AI-Based Threat Detection: Uses Google Gemini API to analyze and summarize potential attacks.

📊 Interactive Dashboard: Visualizes threats by severity, time, and source IP.

🌍 Geo-IP Mapping: Identifies and locates suspicious IP addresses.

📨 AI-Powered Recommendations: Suggests mitigation actions in simple language.

🔔 Instant Alerts: Notifies users when high-severity threats are detected.

🧠 Tech Stack
Layer	Technology
Frontend	React.js, TailwindCSS, Recharts, Socket.IO-client
Backend	Node.js, Express.js, Socket.IO
Database	PostgreSQL / MongoDB
AI Engine	Google Gemini API
Hosting	Vercel (Frontend), Render / Railway (Backend), Neon / Atlas (DB)
🔗 GitHub Repository

👉 https://github.com/your-username/CyberSight

🌐 Live Project

🚀 https://cybersight.vercel.app


🎥 Presentation

🎬https://www.canva.com/design/DAG4JUKAeKE/OcDUxPhWnnm6EM3V-iBrOQ/edit?utm_content=DAG4JUKAeKE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

Team Members
Name                Roles                                   Work done  
Rishabh Saraswat	  Backend Developer	                     Designed and developed backend APIs, implemented log ingestion, detection logic, and database structure.
Kartikay	Garg       Frontend & AI Integration Developer	   Built the React dashboard, connected real-time WebSocket updates, and integrated Gemini AI for intelligent threat detection.