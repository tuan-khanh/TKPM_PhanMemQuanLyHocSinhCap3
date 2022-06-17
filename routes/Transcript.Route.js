const router = require('express').Router();
const TranscriptController = require('../controllers/Transcript.Controller');


// GET /trascript
router.get('/', TranscriptController.default);

module.exports = router