# dev-web-boilerplate — Run Guide

Prerequisites
- Node.js 18+ (LTS recommended). Use `nvm use` or `nvm install` if available.
- One package manager: npm, pnpm, or yarn.
- Optional: Docker and Docker Compose for containerized runs.

Setup
- Install dependencies:
  - npm: `npm install`

Development
- Start the dev server with hot reload:
  - npm: `npm run dev | npm run start:dev`
- Open the URL printed in the terminal (commonly `http://localhost:8080` or `http://localhost:5173`).

Troubleshooting
- Use the right Node version: `nvm use` (or install the version in `.nvmrc`).
- Clear install cache if odd errors persist:
  - npm: `npm ci`
- Verify scripts in `package.json` (ensure `dev`, `build`, `start`, `test`, `lint`, `format` exist).