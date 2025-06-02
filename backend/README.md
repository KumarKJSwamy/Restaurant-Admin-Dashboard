# Restaurant Billing System Backend

This is the backend server for the Restaurant Billing System, built with Node.js, Express.js, and MongoDB.

## Features

- User Authentication (Register, Login)
- Role-based Access Control (Admin, Staff)
- Menu Management (CRUD operations)
- Image Upload for Menu Items
- Input Validation
- Error Handling
- MongoDB Integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   <!-- MONGODB_URI=mongodb://localhost:27017/restaurant-billing -->
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
5. Create the uploads directory:
   ```bash
   mkdir uploads
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Menu Management

- `POST /api/menu` - Create new menu item (Admin only)
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `PUT /api/menu/:id` - Update menu item (Admin only)
- `DELETE /api/menu/:id` - Delete menu item (Admin only)

## Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## File Upload

- Supported formats: Images (jpg, jpeg, png, gif)
- Maximum file size: 5MB
- Files are stored in the `uploads` directory

## Security

- Passwords are hashed using bcrypt
- JWT authentication
- Role-based access control
- Input validation
- File upload restrictions

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- File upload errors
- Database errors
- Server errors

## Development

To run the server in development mode with hot reloading:
```bash
npm run dev
```

## Production

For production deployment:
1. Set `NODE_ENV=production` in `.env`
2. Build the frontend
3. Run the server:
   ```bash
   npm start
   ``` 