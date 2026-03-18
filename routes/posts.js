const express = require('express');
const Joi = require('joi');
const router = express.Router();

/**
 * Joi schema for blog post validation
 */
const blogPostSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': 'Title must be a string.',
    'string.empty': 'Title cannot be empty.',
    'string.min': 'Title must be at least 3 characters long.',
    'any.required': 'Title is required.'
  }),
  content: Joi.string().min(10).required().messages({
    'string.base': 'Content must be a string.',
    'string.empty': 'Content cannot be empty.',
    'string.min': 'Content must be at least 10 characters long.',
    'any.required': 'Content is required.'
  }),
  author: Joi.string().required().messages({
    'string.base': 'Author must be a string.',
    'string.empty': 'Author cannot be empty.',
    'any.required': 'Author is required.'
  })
});

/**
 * Sanitize input by removing HTML tags and trimming whitespace
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * BlogPost class to represent each blog post
 */
class BlogPost {
  constructor(id, title, content, author) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date().toISOString();
  }
}

// In-memory storage for blog posts
const posts = [];
let postIdCounter = 1;

/**
 * POST /posts - Create a new blog post
 */
router.post('/', (req, res) => {
  const { title, content, author } = req.body;

  const { error, value } = blogPostSchema.validate({ title, content, author });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      message: error.details[0].message
    });
  }

  const sanitizedTitle = sanitizeInput(value.title);
  const sanitizedContent = sanitizeInput(value.content);
  const sanitizedAuthor = sanitizeInput(value.author);

  const post = new BlogPost(
    postIdCounter++,
    sanitizedTitle,
    sanitizedContent,
    sanitizedAuthor
  );

  posts.push(post);

  res.status(201).json({
    message: 'Blog post created successfully',
    post
  });
});

/**
 * GET /posts/:id - Retrieve a blog post by its ID
 */
router.get('/:id', (req, res) => {
  const postId = parseInt(req.params.id);

  if (isNaN(postId)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'Post ID must be a valid number.'
    });
  }

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Blog post with ID ${postId} not found.`
    });
  }

  res.status(200).json({
    message: 'Blog post retrieved successfully',
    post
  });
});

/**
 * GET /posts - Retrieve all blog posts
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'All blog posts retrieved successfully',
    posts: posts,
    total: posts.length
  });
});

module.exports = router;
