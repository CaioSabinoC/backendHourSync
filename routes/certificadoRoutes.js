const express = require('express');
const router = express.Router();
const certificadoController = require('../controllers/certificadoController');
const upload = require('../middlewares/uploads');

/**
 * @swagger
 * tags:
 *   name: Certificados
 *   description: Gerenciamento de certificados
 */

/**
 * @swagger
 * /api/certificados:
 *   get:
 *     summary: Listar todos os certificados
 *     tags: [Certificados]
 *     responses:
 *       200:
 *         description: Lista de certificados
 */
router.get('/', certificadoController.listar);

/**
 * @swagger
 * /api/certificados/{id}:
 *   get:
 *     summary: Buscar certificado por ID
 *     tags: [Certificados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificado encontrado
 */
router.get('/:id', certificadoController.buscarPorId);

/**
 * @swagger
 * /api/certificados:
 *   post:
 *     summary: Criar novo certificado
 *     tags: [Certificados]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [titulo, horas, alunoId, categoriaId, cursoId]
 *             properties:
 *               titulo:
 *                 type: string
 *               horas:
 *                 type: number
 *               alunoId:
 *                 type: string
 *               categoriaId:
 *                 type: string
 *               cursoId:
 *                 type: string
 *               arquivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Certificado criado
 */
router.post('/', upload.single('arquivo'), certificadoController.criar);

/**
 * @swagger
 * /api/certificados/{id}/status:
 *   put:
 *     summary: Atualizar status do certificado (aprovar/rejeitar)
 *     tags: [Certificados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [APROVADO, REJEITADO, PENDENTE]
 *               horasAprovadas:
 *                 type: number
 *               justificativa:
 *                 type: string
 *               coordenadorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado
 */
router.put('/:id/status', certificadoController.atualizarStatus);

/**
 * @swagger
 * /api/certificados/{id}:
 *   delete:
 *     summary: Deletar certificado
 *     tags: [Certificados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Certificado deletado
 */
router.delete('/:id', certificadoController.deletar);

module.exports = router;
