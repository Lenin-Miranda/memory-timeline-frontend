# Memory Timeline Frontend

A React application for creating and managing memory timelines with friends and loved ones.

## Features

- 🔐 User authentication (Login/Signup)
- 📅 Create timelines for different relationships
- 💭 Add memories with text, dates, and images
- 🎨 Beautiful carousel interface
- 📱 Responsive design

## Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <REPOSITORY_URL>
   cd memory-timeline-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```bash
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Run the project in development mode**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Go to `http://localhost:3000` to see the application running.

## Usage

1. **Sign up** or **Log in** to your account
2. Click **Add Timeline** to create a new friendship timeline
3. Click on a timeline card to view its memories
4. Click **Add Memory** to create new memories with text, date, and optional image URL
5. Navigate back to view all your timelines

## Available Scripts

- `npm run dev` - Runs the application in development mode
- `npm run build` - Creates the production version
- `npm run preview` - Previews the production version
- `npm run lint` - Runs ESLint to check the code

## Technologies Used

- React 18
- Vite
- React Router
- Context API for state management
- CSS3 for styling

## Design and Figma Files

- [Figma - Team3 Feb CodeJam](https://www.figma.com/design/vs85lkmwHGVVX0uaiq9V8B/Team3_Feb-CodeJam?node-id=307-1427&t=orcu4udRFTgb3fL1-0)
