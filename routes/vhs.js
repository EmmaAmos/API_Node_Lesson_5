const express = require('express');
const router = express.Router();

const vhsController = require('../controllers/vhs');

router.get('/', vhsController.getAll);

router.get('/:id', vhsController.getSingle);

router.post('/', vhsController.createVHS);

router.put('/:id', vhsController.updateVHS);

router.delete('/:id', vhsController.deleteVHS);

module.exports = router;