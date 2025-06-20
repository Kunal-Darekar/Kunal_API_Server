# Kunal API Server - Frontend

The frontend application for the Kunal API Server, built with React, TypeScript, and Material Design.

## Features

- 🎨 Modern Material Design UI
- 📱 Fully responsive layout
- 🔄 Real-time form validation
- ⚡ Optimized performance
- 🎯 Type-safe API integration
- 🔒 Secure user management

## Directory Structure

```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── api/          # API integration
│   ├── App.tsx       # Main application
│   └── index.tsx     # Entry point
├── public/           # Static assets
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

The application will run on port 3000 by default.

## Components

### UserForm
- Creates and updates user information
- Real-time validation
- Error handling
- Loading states

### User List
- Displays user cards
- Responsive grid layout
- Sort and filter capabilities
- Delete confirmation

## API Integration

- Axios for HTTP requests
- TypeScript interfaces
- Error handling
- Loading states

## Styling

- Material Design components
- CSS-in-JS
- Responsive design
- Dark mode support
- Custom animations

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:5001/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request