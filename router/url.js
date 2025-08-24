const express = require('express');
const { handleGenerateNewShortURL,handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

// Route to create a new short URL
router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);
module.exports = router;
