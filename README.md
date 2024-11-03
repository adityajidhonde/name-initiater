
# Name Initiater

**Name Initiater** is a React-based application that helps users generate creative and SEO-friendly domain name suggestions for their projects. It leverages Google’s Generative AI API for providing intelligent domain name ideas based on keywords, industry, and preferred TLDs (Top-Level Domains). Users can also bookmark their favorite domain names and view suggestions based on specific criteria.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

## Features

- **Domain Search**: Quickly search for domain names and extensions relevant to a project or industry.
- **AI-Generated Suggestions**: Generate unique domain names using Google’s Generative AI based on project title, description, keywords, and industry.
- **Bookmark Domains**: Save favorite domain names for easy reference.
- **Protected Routes**: Uses Auth0 for authenticated access to AI-generated suggestions and bookmarking features.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- MongoDB connection string for saving bookmarks and fetching data
- Google Generative AI API key
- Auth0 account for user authentication

### Backend Setup

1. Clone this repository.
2. Install dependencies in the backend folder:
   ```bash
   cd backend
   npm install
   ```
3. Update `uri` in `server.js` with your MongoDB connection string.

4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5050`.

### Frontend Setup

1. Install dependencies in the frontend folder:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env` file in the frontend folder and add your environment variables.

## Environment Variables

Add the following environment variables to your `.env` file:

```bash
REACT_APP_GOOGLE_GENAI_API_KEY=<Your Google Generative AI API Key>
REACT_APP_AUTH0_DOMAIN=<Your Auth0 Domain>
REACT_APP_AUTH0_CLIENT_ID=<Your Auth0 Client ID>
```

## Running the Application

1. Run the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Run the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`.

## API Endpoints

- **Industries** (`/api/industries`): Fetches available industries for domain name generation.
- **Extensions** (`/api/extensions`): Retrieves TLDs for domain suggestions.
- **Random Extensions** (`/api/random-extensions`): Fetches 3 random TLDs.
- **Bookmarks** (`/api/bookmarks`): Saves or retrieves user-specific bookmarked domains.

## Technologies Used

- **Frontend**: React, React Router, axios, react-select, Google Generative AI
- **Backend**: Node.js, Express, Mongoose, MongoDB, CORS
- **Authentication**: Auth0

## Future Enhancements

- Add additional domain customization options (e.g., length, number of words).
- Implement domain availability check for real-time validation.
- Expand to support more industry and TLD options.

---

## Screenshots

*Coming Soon!*

Enjoy using **Name Initiater**! Feel free to contribute and suggest new features.
