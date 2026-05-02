const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Listar todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get('/', categoriaController.listar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Buscar categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria encontrada
 */
router.get('/:id', categoriaController.buscarPorId);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Criar nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, cursoId]
 *             properties:
 *               nome:
 *                 type: string
 *               cursoId:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Categoria criada
 */
router.post('/', categoriaController.criar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Atualizar categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada
 */
router.put('/:id', categoriaController.atualizar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Deletar categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoria deletada
 */
router.delete('/:id', categoriaController.deletar);

module.exports = router;
