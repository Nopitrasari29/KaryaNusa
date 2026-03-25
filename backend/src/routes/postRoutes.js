const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Alamat: GET /api/community
router.get('/', postController.getPosts);

// Alamat: POST /api/community
router.post('/', postController.createPost);

module.exports = router;