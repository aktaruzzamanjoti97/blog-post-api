# Blog Post API

A simple RESTful API for managing blog posts built with Express.js.

## Features

- **Create blog posts** with title, content, and author
- **Retrieve blog posts** by ID
- **Input validation** to ensure data quality
- **Input sanitization** to strip HTML tags (security bonus)
- **In-memory storage** using a Map for efficient lookups
- **Proper HTTP status codes** and error handling

## Requirements

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

You should see:
```
Blog Post API server is running on port 3000

Available endpoints:
  POST   http://localhost:3000/posts
  GET    http://localhost:3000/posts/:id
  GET    http://localhost:3000/posts (all posts)
```

## API Endpoints

### 1. Create a Blog Post

**Endpoint:** `POST /posts`

**Request Body:**
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post. It needs to be at least 10 characters long.",
  "author": "John Doe"
}
```

**Success Response (201 Created):**
```json
{
  "message": "Blog post created successfully",
  "post": {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my blog post. It needs to be at least 10 characters long.",
    "author": "John Doe",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Validation Errors (400 Bad Request):**

Missing required field:
```json
{
  "error": "Validation failed",
  "message": "Title is required and must be a string."
}
```

Title too short:
```json
{
  "error": "Validation failed",
  "message": "Title must be at least 3 characters long."
}
```

Content too short:
```json
{
  "error": "Validation failed",
  "message": "Content must be at least 10 characters long."
}
```

### 2. Get a Blog Post by ID

**Endpoint:** `GET /posts/:id`

**Success Response (200 OK):**
```json
{
  "message": "Blog post retrieved successfully",
  "post": {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my blog post.",
    "author": "John Doe",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Not Found (404):**
```json
{
  "error": "Not Found",
  "message": "Blog post with ID 999 not found."
}
```

### 3. Get All Blog Posts (Bonus)

**Endpoint:** `GET /posts`

**Success Response (200 OK):**
```json
{
  "message": "All blog posts retrieved successfully",
  "posts": [
    {
      "id": 1,
      "title": "My First Blog Post",
      "content": "This is the content of my blog post.",
      "author": "John Doe",
      "createdAt": "2026-03-18T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

## Testing

### Using cURL

**Create a post:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"My First Post\",\"content\":\"This is some content for my blog post that is long enough.\",\"author\":\"Jane Doe\"}"
```

**Get a post by ID:**
```bash
curl http://localhost:3000/posts/1
```

**Get all posts:**
```bash
curl http://localhost:3000/posts
```

**Test validation (title too short):**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Hi\",\"content\":\"This is some content.\",\"author\":\"Jane Doe\"}"
```

**Test 404 (non-existent post):**
```bash
curl http://localhost:3000/posts/999
```

### Using Postman

1. **Create a new request** for `POST http://localhost:3000/posts`
   - Set method to `POST`
   - URL: `http://localhost:3000/posts`
   - Go to Body tab → select `raw` → select `JSON`
   - Paste the JSON body:
   ```json
   {
     "title": "My First Blog Post",
     "content": "This is the content of my blog post. It needs to be at least 10 characters long.",
     "author": "John Doe"
   }
   ```
   - Click Send

2. **Retrieve a post** with `GET http://localhost:3000/posts/1`
   - Set method to `GET`
   - URL: `http://localhost:3000/posts/1`
   - Click Send

## Validation Rules

| Field | Type | Required | Minimum Length |
|-------|------|----------|----------------|
| title | string | Yes | 3 characters |
| content | string | Yes | 10 characters |
| author | string | Yes | - |

## Bonus Features Implemented

1. **Input Sanitization**: HTML tags are automatically stripped from all input fields to prevent XSS attacks.

2. **In-Memory Storage**: Blog posts are stored in a Map data structure for O(1) lookup time.

3. **GET /posts endpoint**: Bonus endpoint to retrieve all blog posts.

4. **Proper error responses**: Descriptive error messages with appropriate HTTP status codes.

## Project Structure

```
blog-post-api/
├── server.js          # Main Express server with API endpoints
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## License

ISC
