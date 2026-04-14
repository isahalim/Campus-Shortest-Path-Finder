# Campus Paths (CSE 331 HW3)

This repository contains the Campus Paths application, a full-stack web application that allows users to find the shortest walking path between buildings on campus using an interactive web interface.

## Project Structure

The project is divided into two main components:

- **`client/`**: The frontend React application.
- **`server/`**: The backend Node.js and Express application.

## Technologies Used

- **Frontend**: React, TypeScript, Webpack, HTML/CSS
- **Backend**: Node.js, Express, TypeScript
- **Algorithm**: Node graph traversal and Dijkstra's algorithm for finding the shortest path between campus buildings.

## Getting Started

### Prerequisites

Ensure you have Node.js and NPM installed on your machine.

### Server Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on port 8088 by default):
   ```bash
   npm run start
   ```

### Client Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
4. Open your browser to interact with the application. The frontend uses a Webpack dev server, which will output the local URL in the terminal (usually `http://localhost:8080`).

## Features

- View a list of campus buildings.
- Select a start and end building to calculate the shortest paths.
- Save commonly searched paths for quick access. 
- The backend parses map data from a CSV file and utilizes Dijkstra's algorithm to compute the most efficient, shortest route across the campus map.
