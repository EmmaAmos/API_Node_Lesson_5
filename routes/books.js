const express = require('express');
const router = express.Router();

const bookController = require('../controllers/books');

router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', bookController.createBOOK);

router.put('/:id', bookController.updateBOOK);

router.delete('/:id', bookController.deleteBOOK);

module.exports = router;