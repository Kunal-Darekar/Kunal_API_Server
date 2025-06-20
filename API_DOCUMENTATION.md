# Kunal API Server - API Documentation

## Base URL
```
http://localhost:5001/api
```

## Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### Users

#### Get All Users
```http
GET /users
```

**Response**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-20T12:00:00Z",
    "updatedAt": "2024-01-20T12:00:00Z"
  }
]
```

#### Get User by ID
```http
GET /users/:id
```

**Parameters**
- `id` (string, required) - User UUID

**Response**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-20T12:00:00Z",
  "updatedAt": "2024-01-20T12:00:00Z"
}
```

#### Create User
```http
POST /users
```

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-20T12:00:00Z",
  "updatedAt": "2024-01-20T12:00:00Z"
}
```

#### Update User
```http
PUT /users/:id
```

**Parameters**
- `id` (string, required) - User UUID

**Request Body**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "password": "newpassword"  // Optional
}
```

**Response**
```json
{
  "id": "uuid",
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "createdAt": "2024-01-20T12:00:00Z",
  "updatedAt": "2024-01-20T12:00:00Z"
}
```

#### Delete User
```http
DELETE /users/:id
```

**Parameters**
- `id` (string, required) - User UUID

**Response**
```json
{
  "message": "User deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error message",
  "error": "Validation error details"
}
```

### 404 Not Found
```json
{
  "message": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "error": "Error details (only in development)"
}
```

## Data Models

### User
```typescript
{
  id: string;        // UUID
  name: string;      // User's full name
  email: string;     // Unique email address
  password: string;  // Hashed password (never returned in responses)
  createdAt: Date;   // Timestamp of creation
  updatedAt: Date;   // Timestamp of last update
}
```

## Rate Limiting
Currently, there are no rate limits implemented.

## Versioning
The API is currently at v1 and is not versioned in the URL.

## CORS
CORS is enabled for all origins in development. Configure as needed for production. 