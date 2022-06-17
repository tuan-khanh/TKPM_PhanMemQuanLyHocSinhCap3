const router = require('express').Router();
const ReportController = require('../controllers/Report.Controller');


// GET report
router.get('/report', ReportController.default);

// GET report/subject
router.get('/subject', ReportController.subject);

// GET /trascript
router.get('/term', ReportController.subject);


module.exports = router