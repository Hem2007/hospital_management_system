# 🏥 MediTrack — Hospital Bed Availability & Prediction System

## Overview
A fully-featured hospital bed management and availability prediction web application with role-based access control.

## Features

### Authentication
- Separate login for **Administrators** and **Staff/Viewers**
- Session-based auth (no backend required)

### Admin Features
- **Dashboard** — Real-time hospital-wide stats and ward overview
- **Bed Management** — Update occupancy, maintenance beds, visual bed grid per ward
- **Patient Management** — Admit, view, and discharge patients
- **Predictions** — 7/14-day AI forecast per ward with charts
- **Reports** — 14-day historical analytics, trend charts, ward performance
- **Alerts** — Auto-generated threshold alerts, create/manage custom alerts
- **User Management** — Add/remove users, view privilege matrix

### Staff/Viewer Features
- **Dashboard** — Read-only view of bed availability and ward status
- **Patients** — View patient list (no admit/discharge)
- **Predictions** — View ward forecasts

## Credentials

| Role          | Username | Password  |
|---------------|----------|-----------|
| Administrator | admin    | admin123  |
| Staff/Viewer  | user     | user123   |
| Staff/Viewer  | staff    | staff123  |

## How to Run
Open `index.html` in any modern web browser. No server or installation required.

## Tech Stack
- Pure HTML, CSS, JavaScript (no frameworks)
- Google Fonts (DM Serif Display + DM Sans)
- Session Storage for data persistence
- SVG for custom charts

## File Structure
```
hospital-system/
├── index.html              # Login page
├── css/
│   └── dashboard.css       # Shared dashboard styles
├── js/
│   └── data.js             # Data store, prediction model, utilities
└── pages/
    ├── admin.html          # Admin dashboard
    ├── dashboard.html      # Staff dashboard (read-only)
    ├── beds.html           # Bed management (admin)
    ├── patients.html       # Patient management
    ├── prediction.html     # AI predictions
    ├── reports.html        # Analytics reports (admin)
    ├── alerts.html         # Alert management (admin)
    └── manage-users.html   # User management (admin)
```
