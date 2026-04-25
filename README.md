# YouTube Clone (React + Vite)

## Project Overview
This project is a frontend clone of YouTube built using React and Vite. It replicates the core UI and basic functionalities of YouTube, including video browsing, video playback, and a Shorts section.

Note: This project does not use any backend services. All data used in the application is hardcoded and designed to closely resemble real YouTube content.

## Features

- Home page with responsive video grid
- Video watch page with video playback
- Shorts page with vertical video scrolling
- Search functionality (filter videos by title)
- Login and Signup (localStorage-based authentication)
- Protected routes (only accessible after login)
- Responsive design for mobile, tablet, and desktop
- Sidebar navigation (Home, Shorts, etc.)
- Navbar with search bar and profile section
- Realistic YouTube-like content using hardcoded data

## Tech Stack

- React (Vite)
- React Router DOM
- Tailwind CSS / CSS
- JavaScript (ES6+)
- LocalStorage (for authentication)

## Folder Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── Sidebar.jsx
│ ├── VideoCard.jsx
│ ├── ShortsCard.jsx
├── pages/
│ ├── Home.jsx
│ ├── Watch.jsx
│ ├── Shorts.jsx
│ ├── Login.jsx
│ ├── Signup.jsx
├── data/
│ ├── videos.js
│ ├── shorts.js
├── App.jsx
├── main.jsx

## Installation and Setup

1. Clone the repository:
   git clone https://github.com/anishakujur367-alt/YT_CLONE.git

2. Navigate to the project folder:
   cd YT_CLONE

3. Install dependencies:
   npm install

4. Run the development server:
   npm run dev

## Authentication

- User Signup stores data in localStorage
- Login validates user credentials from localStorage
- Authentication state is maintained using localStorage
- Protected routes restrict access to main pages

## Data Handling

- All data in this project is hardcoded (no backend or API is used)
- Separate files are used for managing data:
  - videos (videos.js)
  - shorts (shorts.js)
- Data is structured to closely mimic real YouTube data
- Includes fields like title, views, channel name, thumbnails, and duration
- Helps simulate real-world application behavior without backend integration

## Team Members

- Anisha Kujur
- Riya
- Soumya

## GitHub Collaboration

- All members contributed via GitHub
- Each member worked on separate components and features
- Version control maintained using Git

## Future Improvements

- Add real backend (Node.js, Firebase, etc.)
- Replace hardcoded data with real API integration
- Add comments and likes functionality
- Improve UI animations and transitions