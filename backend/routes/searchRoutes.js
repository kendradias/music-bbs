const express = require('express');
const router = express.Router();
const { searchMusic } = require('../services/musicApiService');

router.get('/search', async (req, res) => {
  const { query, attribute } = req.query;
  if (!query || !attribute) {
    return res.status(400).json({ error: 'Missing query or attribute parameter' });
  }
  try {
    const data = await searchMusic(query, attribute);
    res.json(data);
  } catch (error) {
    console.error('Error fetching music data:', error);
    res.status(500).json({ error: 'Failed to fetch music data' });
  }
});

module.exports = router;
