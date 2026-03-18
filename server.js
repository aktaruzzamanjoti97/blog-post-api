const express = require('express');
const postsRouter = require('./routes/posts');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the posts router at /posts
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the Blog Post API' });
});

// 404 handler for undefined routes
app.use((req, res) => {
	res.status(404).json({
		error: 'Not Found',
		message: `Route ${req.method} ${req.path} not found.`,
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: 'Internal Server Error',
		message: 'Something went wrong on the server.',
	});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Blog Post API server is running on port ${PORT}`);
	console.log(`\nAvailable endpoints:`);
	console.log(`  POST   http://localhost:${PORT}/posts`);
	console.log(`  GET    http://localhost:${PORT}/posts/:id`);
	console.log(`  GET    http://localhost:${PORT}/posts (all posts)`);
});

module.exports = app;
