# MovieFlix Dashboard

## Overview

**MovieFlix Dashboard** is a full-stack web application that allows users to search, browse, and analyze movie data using a free movie API (OMDb API). The application fetches movie data from the API, caches it locally in a MongoDB database, and provides advanced sorting, and data visualization features. Admin-level actions are protected with JWT-based authentication.

---

## Features

### Frontend Features

- **Search Movies:** Users can search movies by title.
- **Sorting:** Sort results by rating, year, runtime, or title in ascending/descending order.
- **Pagination:** Browse large result sets with next/prev page functionality.
- **Movie Details Page:** Detailed view for each movie with plot, cast, runtime, genre, and IMDb link.
- **Stats Dashboard:** Data visualization using charts:
  - Pie chart: Genre distribution.
  - Bar chart: Average rating by genre.
  - Line chart: Average runtime by year.
- **Download CSV:** Export movie results for the current page as a CSV file.
- **Fixed Header:** Navigation and search bar remain visible while scrolling.

### Backend Features

- **Movie API Integration:** Fetches movie data from OMDb API.
- **Local Database Caching:** MongoDB cache reduces repeated API calls.
- **Data Transformation & Aggregation:** Normalizes movie data and computes stats.
- **JWT-based Authentication:** Protects admin-only routes.
- **Search, Filter, and Sort:** API supports query parameters for flexible searches.
- **Pagination:** Supports limit and page parameters.
- **Error Handling:** Returns descriptive error messages for API or server issues.

---

## Core Concepts Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, TailwindCSS, React Router, Chart.js
- **API Integration:** Axios for HTTP requests
- **Authentication:** JSON Web Tokens (JWT)
- **Data Caching:** Local MongoDB cache to reduce API calls
- **Data Visualization:** Pie, Bar, and Line charts using Chart.js

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)
- OMDb API key ([Get a free key](http://www.omdbapi.com/apikey.aspx))

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the server directory with the following:
   `bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/movieflix
JWT_SECRET=super_secret_change_me
OMDB_API_KEY=YOUR_OMDB_API_KEY
CLIENT_URL=http://localhost:5173
    `

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the front directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3.Create a .env file in the client directory with the API base URL:
`bash
    VITE_API_BASE=http://localhost:5000/api
    `

4. Start the frontend server:
   ```bash
    npm run dev
   ```
