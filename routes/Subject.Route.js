const router = require('express').Router();
const SubjectController = require('../controllers/Subject.Controller')


// GET /subject/all
router.get('/all', SubjectController.getAll)

// GET /subject/create
router.get('/create', SubjectController.getCreateForm)

// GET /subject/update/:id
router.get('/update/:id', SubjectController.getUpdateForm)

// POST /subject/create
router.post('/create', SubjectController.create)

// PUT /subject/:id
router.put('/:id', SubjectController.update)

// DELETE /subject/:id
router.delete('/:id', SubjectController.delete)

module.exports = router