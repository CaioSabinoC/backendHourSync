const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gerenciamento de cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Listar todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/', cursoController.listar);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Buscar curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso encontrado
 */
router.get('/:id', cursoController.buscarPorId);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Criar novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, horasExigidas]
 *             properties:
 *               nome:
 *                 type: string
 *               horasExigidas:
 *                 type: number
 *     responses:
 *       201:
 *         description: Curso criado
 */
router.post('/', cursoController.criar);

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     summary: Atualizar curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso atualizado
 */
router.put('/:id', cursoController.atualizar);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Deletar curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Curso deletado
 */
router.delete('/:id', cursoController.deletar);

module.exports = router;
