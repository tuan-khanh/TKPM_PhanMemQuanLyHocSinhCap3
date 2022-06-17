const router = require('express').Router();
const ReportController = require('../controllers/Report.Controller');


// GET report/subject
router.get('/subject', ReportController.subject);

// GET report/term
router.get('/term', ReportController.term);


module.exports = router