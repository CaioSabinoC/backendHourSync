const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividadeController');

/**
 * @swagger
 * tags:
 *   name: Atividades
 *   description: Gerenciamento de atividades complementares
 */

/**
 * @swagger
 * /api/atividades:
 *   get:
 *     summary: Listar todas as atividades
 *     tags: [Atividades]
 *     responses:
 *       200:
 *         description: Lista de atividades
 */
router.get('/', atividadeController.listar);

/**
 * @swagger
 * /api/atividades/{id}:
 *   get:
 *     summary: Buscar atividade por ID
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atividade encontrada
 */
router.get('/:id', atividadeController.buscarPorId);

/**
 * @swagger
 * /api/atividades:
 *   post:
 *     summary: Criar nova atividade
 *     tags: [Atividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, codigo, cursoId, categoriaId, horasPorSemestre]
 *             properties:
 *               nome:
 *                 type: string
 *               codigo:
 *                 type: string
 *               cursoId:
 *                 type: array
 *                 items:
 *                   type: string
 *               categoriaId:
 *                 type: string
 *               horasPorSemestre:
 *                 type: number
 *     responses:
 *       201:
 *         description: Atividade criada
 */
router.post('/', atividadeController.criar);

/**
 * @swagger
 * /api/atividades/{id}:
 *   put:
 *     summary: Atualizar atividade
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atividade atualizada
 */
router.put('/:id', atividadeController.atualizar);

/**
 * @swagger
 * /api/atividades/{id}:
 *   delete:
 *     summary: Deletar atividade
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Atividade deletada
 */
router.delete('/:id', atividadeController.deletar);

module.exports = router;
