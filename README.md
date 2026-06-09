# Campus Notifications App

A Next.js frontend for campus announcements with a priority inbox and custom logging middleware.

## Setup

1. `cd notification_app_fe`
2. `npm install` (The `logging-middleware` package is already linked locally)
3. `npm run dev`

## Features Implemented
- **All Updates Page**: Lists all announcements with a dropdown to filter by type.
- **Priority Inbox**: Algorithm to show top 10 important updates (Placement > Result > Event).
- **Custom Logging Middleware**: Intercepts errors and sends them to the backend API asynchronously without breaking the app.
- **Proxy Route**: Used Next.js API routes to securely proxy requests to the evaluation server and bypass CORS.
- **Dark Mode UI**: Designed a clean and responsive interface for the notifications.


