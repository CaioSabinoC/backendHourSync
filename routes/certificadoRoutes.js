const express = require('express');
const router = express.Router();
const certificadoController = require('../controllers/certificadoController');
const upload = require('../middlewares/uploads');

router.post('/', upload.single('arquivo'), certificadoController.criar);
router.get('/', certificadoController.listar);
router.get('/:id', certificadoController.buscarPorId);
router.put('/:id/status', certificadoController.atualizarStatus);
router.delete('/:id', certificadoController.deletar);

module.exports = router;