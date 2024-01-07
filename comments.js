// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create app
const app = express();
// Use cors
app.use(cors());
// Use body parser
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create route for get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route for post comments
app.post('/posts/:id/comments', (req, res) => {
  // Create id for comments
  const commentId = randomBytes(4).toString('hex');
  // Get content from req.body
  const { content } = req.body;
  // Get comments from post id
  const comments = commentsByPostId[req.params.id] || [];
  // Push new comment to comments
  comments.push({ id: commentId, content });
  // Set comments
  commentsByPostId[req.params.id] = comments;
  // Send response
  res.status(201).send(comments);
});

// Listen app
app.listen(4001, () => {
  console.log('Listening on 4001');
});