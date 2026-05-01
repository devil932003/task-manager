# Modern Task Manager

> A full-stack MERN task management platform built for team productivity, role-based access, task assignment, progress tracking, and clean dashboard analytics.

Made by **Devansh Mishra**

## Repository

Add your repository link here:

```text
GitHub Repository: <PASTE_YOUR_REPO_LINK_HERE>
Live Demo: <PASTE_YOUR_DEPLOYED_APP_LINK_HERE>
Demo Video: <PASTE_YOUR_LOOM_LINK_HERE>
```

## Project Overview

Modern Task Manager is a collaborative task management web app where administrators can create teams, assign work, track task stages, manage priorities, and monitor overall progress from a dashboard. Regular users can log in, view assigned tasks, update task progress, and follow task activity.

The app is built with the MERN stack:

- **MongoDB** for database storage
- **Express.js** for backend APIs
- **React + Vite** for the frontend
- **Node.js** for the server runtime
- **Redux Toolkit Query** for API state management
- **Tailwind CSS** for responsive modern UI
- **JWT + HTTP-only cookies** for authentication

## Key Features

### Authentication

- User registration
- User login and logout
- JWT authentication using cookies
- Protected backend routes
- Role-based access for admins and regular users

### Admin Features

- Create users and team members
- Activate or deactivate users
- Delete users
- Create tasks
- Assign tasks to one or multiple users
- Set task stage: Todo, In Progress, Completed
- Set priority: High, Medium, Normal, Low
- Add sub-tasks
- Duplicate tasks
- Move tasks to trash
- Restore or permanently delete trashed tasks
- View team and task statistics

### User Features

- Login securely
- View assigned tasks
- Check task priority and status
- View task details, team members, assets, subtasks, and activity timeline
- Add task activity/comments where enabled

### Dashboard Features

- Total task count
- Completed task count
- In-progress task count
- Todo task count
- Priority chart
- Recent task list
- Active team member summary

## Folder Structure

```text
taskmanager-main/
  client/
    src/
      components/
      pages/
      redux/
      utils/
    package.json
    vite.config.js

  server/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    index.js
    package.json
```

## Environment Variables

### Server `.env`

Create `server/.env`:

```env
PORT=8800
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/taskmanager?retryWrites=true&w=majority
JWT_SECRET=<your-secure-secret>
```

### Client `.env`

Create `client/.env`:

```env
VITE_APP_BASE_URL=http://localhost:8800
VITE_APP_FIREBASE_API_KEY=<optional-if-you-use-firebase-assets>
```

## Installation

### 1. Clone the Repository

```bash
git clone <PASTE_YOUR_REPO_LINK_HERE>
cd taskmanager-main
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

## Running the App Locally

### Start Backend

```bash
cd server
npm start
```

Backend runs on:

```text
http://localhost:8800
```

### Start Frontend

```bash
cd client
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

If PowerShell blocks npm scripts on Windows, use:

```bash
cmd /c npm start
```

## Important First-Run Notes

- The first registered user becomes the admin.
- After at least one user exists, only an admin can create more users.
- If login feels stuck, clear browser localStorage or log out and refresh.
- Make sure MongoDB Atlas Network Access allows your IP address.

## API Routes Overview

### User Routes

```text
POST   /api/user/register
POST   /api/user/login
POST   /api/user/logout
GET    /api/user/get-team
GET    /api/user/notifications
PUT    /api/user/profile
PUT    /api/user/change-password
PUT    /api/user/:id
DELETE /api/user/:id
```

### Task Routes

```text
POST   /api/task/create
POST   /api/task/duplicate/:id
POST   /api/task/activity/:id
GET    /api/task/dashboard
GET    /api/task
GET    /api/task/:id
PUT    /api/task/create-subtask/:id
PUT    /api/task/update/:id
PUT    /api/task/:id
DELETE /api/task/delete-restore/:id?
```

## How to Use the App

### 1. Register the Admin

Open:

```text
http://localhost:3000/register
```

Create the first account. This account becomes the admin automatically.

### 2. Log In

Open:

```text
http://localhost:3000/log-in
```

Enter email and password. After login, the app opens the dashboard.

### 3. Review the Dashboard

Use the dashboard to explain:

- Total number of tasks
- Completed tasks
- In-progress tasks
- Todo tasks
- Priority chart
- Recent task table
- Active team list

### 4. Add Team Members

Go to **Team**.

Show:

- Add New User
- Fill name, title, email, role, and password
- Submit user
- Activate/deactivate account
- Edit user profile
- Delete user

### 5. Create a Task

Go to **Tasks**.

Show:

- Create Task
- Add title
- Assign users
- Choose stage
- Choose priority
- Pick task date
- Submit

### 6. View Tasks

Show:

- Board view
- List view
- Todo filter
- In Progress filter
- Completed filter

### 7. Task Details

Open a task and explain:

- Priority
- Stage
- Created date
- Assigned team
- Assets
- Subtasks
- Activity timeline

### 8. Trash and Restore

Go to **Trash**.

Show:

- Trashed tasks
- Restore task
- Delete permanently
- Restore all
- Delete all

## Loom Demo Video Guide

Use this section as your recording plan.

### Demo Setup Checklist

Before recording:

- Start MongoDB connection
- Start backend server on `http://localhost:8800`
- Start frontend on `http://localhost:3000`
- Keep one admin account ready
- Add 2-3 sample users
- Add 3-5 sample tasks with different stages and priorities
- Keep browser zoom at 100%
- Close unnecessary tabs

## Suggested Loom Script

### Opening

“Hello, my name is Devansh Mishra, and this is my Modern Task Manager project. It is a full-stack MERN application designed to help teams manage tasks, assign work, track progress, and view productivity insights from a clean dashboard.”

### Tech Stack

“The frontend is built with React, Vite, Tailwind CSS, Redux Toolkit, and RTK Query. The backend is built with Node.js, Express.js, MongoDB, Mongoose, JWT authentication, and cookie-based sessions.”

### Authentication Demo

“I’ll start by showing the authentication flow. Users can register and log in securely. The first user becomes the admin, and after that, only admins can create more users.”

Show:

1. Register page
2. Login page
3. Successful dashboard redirect
4. Logout button

### Dashboard Demo

“After login, the dashboard gives a quick overview of the workspace. Here we can see total tasks, completed tasks, in-progress tasks, todo tasks, a priority chart, recent tasks, and active team members.”

Point to:

- Stats cards
- Chart
- Recent task table
- Team member table

### Team Management Demo

“As an admin, I can manage team members. I can add a new user, edit user information, activate or deactivate a user, and delete users if needed.”

Show:

1. Team page
2. Add New User modal
3. User table
4. Status control
5. Delete option

### Task Management Demo

“The main feature of the app is task management. Admins can create tasks, assign them to users, set priority, choose a due date, and define the task stage.”

Show:

1. Tasks page
2. Create Task modal
3. Board view
4. List view
5. Todo/In Progress/Completed filters

### Task Details Demo

“Each task has a detail page where we can see the task priority, current stage, assigned team members, subtasks, assets, and activity timeline.”

Show:

1. Open task
2. Task Detail tab
3. Activities/Timeline tab
4. Add activity section

### Trash Demo

“The app also includes trash management. Admins can move tasks to trash, restore them, permanently delete one task, or clear the trash.”

Show:

1. Trash page
2. Restore button
3. Delete button
4. Restore All and Delete All

### Closing

“To summarize, Modern Task Manager is a complete MERN productivity app with authentication, role-based access, team management, task creation, task tracking, dashboard analytics, and trash management. This project was built by Devansh Mishra.”

## Common Issues and Fixes

### `npm start` does not work

Run:

```bash
cmd /c npm start
```

### MongoDB connection error

Check:

- MongoDB URI is correct
- Password is URL-safe
- IP address is whitelisted in MongoDB Atlas
- Database user has read/write permissions

### Port already in use

Find process:

```bash
netstat -ano | findstr :8800
```

Kill process:

```bash
taskkill /PID <PID> /F
```

### Old login still appears

Clear browser localStorage or log out:

```text
Application tab -> Local Storage -> Clear
```

## Future Improvements

- Real-time notifications with Socket.IO
- File upload integration
- Search and advanced filters
- Task comments with rich text
- Drag-and-drop Kanban board
- Deployment guide for Render, Vercel, and MongoDB Atlas

## Author

**Devansh Mishra**

```text
GitHub: <PASTE_YOUR_GITHUB_PROFILE_HERE>
LinkedIn: <PASTE_YOUR_LINKEDIN_HERE>
Portfolio: <PASTE_YOUR_PORTFOLIO_HERE>
```
