# Custom API Server

A custom API server for managing user data, built with Express, TypeScript, and SQLite.

## Test Coverage Overview

![Test Coverage](../assets/test-coverage.png)

## Tech Stack

- Node.js
- Express.js
- TypeScript
- SQLite (via TypeORM)
- Jest (Testing)
- Supertest (API Testing)

## Features

- RESTful API endpoints for user management
- CRUD operations for users
- Data persistence with SQLite
- TypeScript for type safety
- Comprehensive test suite with 93.75% coverage
- Automated error handling and validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```
   The server will start on http://localhost:5001

### Running Tests

The project includes a comprehensive test suite with unit tests, integration tests, and API tests.

1. Run all tests:
   ```bash
   npm test
   ```

2. Run tests with coverage:
   ```bash
   npm run test:coverage
   ```

## Test Coverage

Current test coverage (as of latest run):
- Overall: 93.75%
- Models: 100%
- Routes: 100%
- Controllers: 97.18%
- App Configuration: 77.27%

### Test Types

1. Unit Tests (`src/__tests__/userController.test.ts`)
   - Tests individual functions in isolation
   - Uses Jest mocks for dependencies
   - Tests error handling and edge cases
   - Coverage: 97.18%

2. Integration Tests (`src/__tests__/userIntegration.test.ts`)
   - Tests database operations
   - Uses in-memory SQLite database
   - Tests data persistence and constraints
   - Coverage: 100%

3. API Tests (`src/__tests__/userApi.test.ts`)
   - Tests HTTP endpoints
   - Uses Supertest for HTTP assertions
   - Tests request/response cycles
   - Coverage: 100%

4. App Configuration Tests (`src/__tests__/app.test.ts`)
   - Tests Express middleware setup
   - Tests database initialization
   - Tests environment configurations
   - Coverage: 77.27% (Note: Uncovered lines are intentionally skipped server startup code)

### Test Statistics
- Total Test Suites: 4
- Total Tests: 46
- Passing Tests: 46
- Failed Tests: 0
- Test Coverage: 93.75%

## API Documentation

### Endpoints

- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get a specific user
- POST `/api/users` - Create a new user
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user

For detailed API documentation, see the API_DOCUMENTATION.md file in the root directory.

## Project Structure

```
backend/
├── src/
│   ├── __tests__/           # Test files
│   │   ├── app.test.ts           # App configuration tests
│   │   ├── userApi.test.ts       # API endpoint tests
│   │   ├── userController.test.ts # Unit tests
│   │   └── userIntegration.test.ts # Integration tests
│   ├── controllers/         # Request handlers
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   └── app.ts              # Application entry point
├── jest.config.js          # Jest configuration
└── tsconfig.json          # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

