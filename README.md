# Service Selection Platform

A modern React application where users can browse and select services provided by entrepreneurs and freelancers.

## Features

- **User Authentication**: Login/logout functionality with session management
- **Service Marketplace**: Browse services with filtering and search capabilities
- **Service Details**: Detailed view of services with entrepreneur information
- **Responsive Design**: Modern UI with Tailwind CSS
- **Mock Database**: JSON-based data storage for development

## Demo Credentials

- **Email**: john@example.com
- **Password**: password123

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.tsx    # Route protection component
├── contexts/
│   └── AuthContext.tsx       # Authentication context
├── data/
│   └── mockData.json         # Mock database
├── pages/
│   ├── LoginPage.tsx         # Login page
│   ├── ServiceListing.tsx    # Service marketplace
│   └── ServiceDetails.tsx    # Service details page
├── App.tsx                   # Main app component
└── main.tsx                  # App entry point
```

## Technologies Used

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Features Overview

### Authentication

- Secure login with email/password
- Session persistence using localStorage
- Protected routes for authenticated users

### Service Marketplace

- Browse services by category
- Search functionality
- Filter by category
- Service ratings and reviews
- Entrepreneur profiles

### Service Details

- Comprehensive service information
- Entrepreneur details and specialties
- Pricing and duration
- Feature lists
- Contact options

## Mock Data

The application uses a JSON file (`src/data/mockData.json`) containing:

- User accounts for authentication
- Entrepreneur profiles
- Service listings
- Categories

## Development

The app is built with modern React patterns:

- Functional components with hooks
- Context API for state management
- TypeScript for type safety
- Responsive design principles
