# Kunal API Server - Backend

The backend service for the Kunal API Server, built with Node.js, Express, TypeScript, and SQLite.

## Features

- 🔥 TypeScript for type safety
- 📦 TypeORM for database management
- 🔒 Secure password handling
- 🚀 RESTful API architecture
- ✨ Clean code structure
- 📝 Comprehensive error handling

## Directory Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── db/           # Database configuration
│   └── app.ts        # Application entry point
├── package.json
└── tsconfig.json
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The server will run on port 5001 by default.

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Database

- Uses SQLite with TypeORM
- Auto-creates database.sqlite file
- Automatic schema synchronization

## Development

### Available Scripts

- `npm start` - Start the server
- `npm run build` - Build for production
- `npm test` - Run tests

### TypeORM Configuration

```typescript
{
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: [User],
  logging: true
}
```

## Error Handling

- Comprehensive error messages
- HTTP status codes
- Validation errors
- Database errors

## Security

- Password hashing
- Input validation
- Error sanitization
- Type checking

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request