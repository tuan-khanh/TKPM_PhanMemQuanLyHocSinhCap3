const router = require('express').Router();
const studentController = require('../controllers/Student.Controller')

// GET /student/create
router.get('/create', studentController.getCreateForm)

// GET /student/all
router.get('/all', studentController.getAll)

// GET /student/:id

// GET /student/update/:id
router.get('/update/:id', studentController.getUpdateForm)

// POST /student/create
router.post('/create', studentController.create)

// PUT /student/:id
router.put('/:id', studentController.update)

// DELETE /student/:id
router.delete('/:id', studentController.delete)

module.exports = router