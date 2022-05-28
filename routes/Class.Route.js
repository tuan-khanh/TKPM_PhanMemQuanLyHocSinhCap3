const router = require('express').Router();
const classController = require('../controllers/Class.Controller')


// GET /class/all
router.get('/all', classController.getAll)

// GET /class/:id
router.get('/:id', classController.getOneClass);

// GET /class/update/:id
router.get('/update/:id', classController.getUpdateForm)

// POST /class/create
router.post('/create', classController.create)

// PUT /class/:id
router.put('/:id', classController.update)

// DELETE /class/:id
router.delete('/:id', classController.delete)

module.exports = router