# Pomodoro App for Insiohacks hackathon
## Built with React Vite, Node Express, PostgreSQL, Supabase | PERN STACK`
`

# https://www.pomotivity.com/

## Table of Contents
- [Pomodoro App for Insiohacks hackathon](#pomodoro-app-for-insiohacks-hackathon)
  - [Built with React Vite, Node Express, PostgreSQL, Supabase | PERN STACK\`](#built-with-react-vite-node-express-postgresql-supabase--pern-stack)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Setup \& Installation](#setup--installation)
  - [Running Locally](#running-locally)

## Description

Pomodoro Study App is a productivity tool designed for students and professionals who wish to optimize their study or work sessions. The app utilizes the Pomodoro Technique, a time management method developed by Francesco Cirillo in the late 1980s. The technique involves breaking your work into focused intervals (usually 25 minutes), separated by short breaks. This app not only helps you implement the Pomodoro Technique but also offers features to track your progress, set goals, and more.

## Features
- **Pomodoro Timer**: Set up intervals and breaks to boost productivity.
- **Task Management**: Add, edit, and delete tasks that you wish to focus on.
- **Music Player**: Play a curated Lo-Fi playlist, or configure your own playlist from Youtube.
- **User Authentication**: Secure login and sign-up functionality powered by Supabase.
- **Customizability**: Over 70+ themes and presets tailored for your own needs.
## Technologies Used
- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Supabase (as a backend-as-a-service)
- **Full Stack**: PERN (PostgreSQL, Express, React, Node)

## Prerequisites
Before running the app locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:dangphung4/pomodoro-insiohacks2023.git
   cd my-pomodoro-app
   ```

2. **Install Dependencies**:
   If you're using `yarn`:
   ```bash
   yarn install
   ```
   Or if you're using `npm`:
   ```bash
   npm install
   ```

3. **Setup Database**:
   - Start PostgreSQL service.
   - Create a database named `pomodoro_app`.
   - Update the database connection string in your backend configuration to connect to the `pomodoro_app` database.

4. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add required environment variables.
    ```bash
   VITE_SUPABASE_URL=#Your supabase URL
    VITE_SUPABASE_ANON_KEY=#Your supabase Key
    ```
5. **Start the Frontend Dev Server**:
   ```bash
   cd src
   npm run dev
   ```

## Running Locally
1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:5173/`.
3. Enjoy the Pomodoro Study App experience!

