const router = require('express').Router();
const RuleController = require('../controllers/Rule.Controller');
// GET rule
router.get('/', RuleController.default);

// GET rule/all
router.get('/all', RuleController.getAll)

// PUT rule
router.put('/:id', RuleController.update);

module.exports = router;