const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividadeController');


router.get('/', atividadeController.listar);
router.get('/:id', atividadeController.buscarPorId);
router.post('/', atividadeController.criar);
router.put('/:id', atividadeController.atualizar);
router.delete('/:id', atividadeController.deletar);

module.exports = router;