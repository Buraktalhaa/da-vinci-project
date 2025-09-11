# Da Vinci Project

This is a full stack web development assignment project.

## Project Structure

- **frontend/**: React + TypeScript + Vite frontend
- **backend/**: NestJS + TypeScript backend

## Frontend

- Technologies: React, TypeScript, Vite, ESLint
- Features: User & Post lists, CRUD operations, routing, layout
- Run locally:
```bash
cd frontend
npm install
npm run dev
```
- Deployment: [Frontend on Netlify](https://da-vinci-frontend.netlify.app)
> Note: Backend is local, so live data will not appear on the deployed frontend.

## Backend

- Technologies: Node.js, NestJS, TypeScript
- Features: CRUD API for users and posts
- Run locally:
```bash
cd backend
npm install
npm run start:dev
```

## Notes

- Frontend and backend run on separate ports.
- Backend data is hardcoded inside services (no database required).
