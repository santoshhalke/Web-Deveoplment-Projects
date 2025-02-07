const express = require('express');
const { handleCreateShortURL, handleGetShortURL, handleGetAllURL } = require('../controllers/url');
const router = express.Router();

router.post('/', handleCreateShortURL);
router.get('/', handleGetAllURL);
router.get('/:id', handleGetShortURL);

module.exports = router;