# Frontend - Web Development Assignment

This is the **frontend part** of the Web Development Assignment built with **React + TypeScript + Vite**.

## Overview

The frontend displays **Users** and **Posts**, allows CRUD operations, and fetches data either from sample JSON or from the backend API (if integrated). It includes routing, layout, and UI components for a clean and user-friendly interface.

## Technologies Used

- React
- TypeScript
- Vite
- ESLint

## Features

- Homepage showing links to Users and Posts.
- User and Post list with **CRUD operations**.
- Relation between users and posts through `userId`.
- Routing with dynamic pages.
- Basic styling for readability and UI/UX.
- Fetches data from JSONPlaceholder or backend API.

## Setup & Run

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Run the development server

```bash
npm run dev
```

- The app should open in your browser at `http://localhost:5173` (Vite default port).

### 3. Build for production

```bash
npm run build
```

- Production-ready files will be generated in the `dist` folder.

## Notes

- Make sure the backend server is running if you want to fetch real data.
- ESLint rules are applied; the code should not contain linting errors.
