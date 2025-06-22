# Kunal API Server

A full-stack user management application built with TypeScript, React, Node.js, and SQLite.

## Application Screenshots

### User Interface
![User Management System Screenshot](./assets/user.png)

### Test Coverage
![Test Coverage](./assets/test-coverage.png)

## Features

- 🚀 Modern TypeScript/React frontend
- 🔒 Secure user authentication
- 📱 Responsive Material Design UI
- 🎯 RESTful API endpoints
- 🗄️ SQLite database with TypeORM
- ✨ CRUD operations for user management
- 🧪 Comprehensive test suite (93.75% coverage)
- 🛡️ Type-safe codebase
- 🔄 Real-time form validation
- 📊 Detailed error handling

## Project Structure

```
kunal-api-server/
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js TypeScript backend
│   ├── src/          # Source code
│   │   ├── __tests__/     # Test suites (46 tests)
│   │   ├── controllers/   # Request handlers
│   │   ├── models/       # Data models
│   │   └── routes/       # API routes
│   └── coverage/     # Test coverage reports
├── assets/           # Project assets and images
├── README.md         # Main documentation
└── API_DOCUMENTATION.md # API endpoints documentation
```

## Test Coverage

The backend includes a comprehensive test suite with:
- 46 automated tests
- 4 test suites
- 93.75% overall coverage
- 100% coverage for models and routes
- 97.18% coverage for controllers
- Includes unit tests, integration tests, and API tests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Kunal-Darekar/Kunal_API_Server
   cd kunal-api-server
   ```

2. Start the backend:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Running Tests

### Backend Tests
```bash
cd backend
npm test          # Run tests
npm run test:coverage  # Run tests with coverage report
```

### Frontend Tests (Coming Soon)
```bash
cd frontend
npm test
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 5001)
- `NODE_ENV`: Environment ('development' | 'test' | 'production')

### Frontend
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5001/api)

## Development

- Backend runs on port 5001
- Frontend runs on port 3000
- SQLite database is created automatically
- Tests run in-memory SQLite database

## Technologies Used

### Frontend
- React 18
- TypeScript
- Material Design
- Axios

### Backend
- Node.js
- Express
- TypeScript
- TypeORM
- SQLite
- Jest & Supertest

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


