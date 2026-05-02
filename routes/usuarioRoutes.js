const router = require('express').Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar, autorizar } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', usuarioController.listar);

/**
 * @swagger
 * /api/usuarios/coordenadores:
 *   get:
 *     summary: Listar coordenadores
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de coordenadores
 */
router.get('/coordenadores', usuarioController.listarCoordenadores);

/**
 * @swagger
 * /api/usuarios/alunos:
 *   get:
 *     summary: Listar alunos
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de alunos
 */
router.get('/alunos', usuarioController.listarAlunos);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', usuarioController.buscarPorId);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, role]
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, COORDENADOR, ALUNO]
 *               matricula:
 *                 type: string
 *               cursoId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post('/', usuarioController.criar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
router.put('/:id', usuarioController.atualizar);

/**
 * @swagger
 * /api/usuarios/{id}/ativo:
 *   put:
 *     summary: Alterar status ativo/inativo do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: ativo
 *         required: true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Status alterado
 */
router.put('/:id/ativo', autenticar, autorizar('SUPER_ADMIN'), usuarioController.alterarStatus);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário deletado
 */
router.delete('/:id', autenticar, autorizar('SUPER_ADMIN'), usuarioController.deletar);

module.exports = router;
