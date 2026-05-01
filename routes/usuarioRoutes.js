const router = require('express').Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar, autorizar } = require('../middlewares/auth');

router.get('/', usuarioController.listar);
router.get('/coordenadores', usuarioController.listarCoordenadores);
router.get('/alunos', usuarioController.listarAlunos);
router.get('/:id', usuarioController.buscarPorId);
router.post('/', usuarioController.criar);
router.put('/:id', usuarioController.atualizar);
router.put('/:id/ativo', autenticar, autorizar('SUPER_ADMIN'), usuarioController.alterarStatus);
router.delete('/:id', autenticar, autorizar('SUPER_ADMIN'), usuarioController.deletar);

module.exports = router;
