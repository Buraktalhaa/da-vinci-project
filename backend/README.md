# Backend - Web Development Assignment

This is the **backend part** of the Web Development Assignment built with **NestJS (TypeScript)**.

## Overview

The backend provides **CRUD APIs** for **Users** and **Posts**, including services to fetch, create, update, and delete data. The initial data is hardcoded in service files, no database is required.

## Technologies Used

- Node.js
- NestJS (TypeScript)
- Express (within NestJS)
- ESLint

## Features

- CRUD endpoints for Users and Posts:
  - Get all users/posts
  - Get user/post by id
  - Create user/post
  - Update user/post
  - Delete user/post
- Add new posts to specific users.
- Frontend integration ready.

## Setup & Run

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Run the development server

```bash
npm run start:dev
```

- The backend server runs at `http://localhost:3000` (default port).

### 3. API Endpoints

- Users: `GET /users`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`
- Posts: `GET /posts`, `POST /posts`, `PUT /posts/:id`, `DELETE /posts/:id`
- Add post to user: `POST /users/:id/posts`

### 4. Notes

- ESLint rules are applied; the code should not contain linting errors.
- Make sure to run the backend server before fetching data from frontend.
- Both frontend and backend run on separate ports.
