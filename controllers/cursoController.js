const Curso = require('../models/Curso');

const cursoController = {

  async listar(req, res, next) {
    try {
      const cursos = await Curso.find();
      res.json(cursos);
    } catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try {
      const curso = await Curso.findById(req.params.id);

      if (!curso) {
        return res.status(404).json({ erro: 'Curso não encontrado' });
      }

      res.json(curso);
    } catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try {
      const { nome, horasExigidas } = req.body;

      if (!nome || !horasExigidas) {
        return res.status(400).json({ erro: 'Nome e horas exigidas são obrigatórios' });
      }

      const curso = await Curso.create({
        nome,
        horasExigidas
      });

      res.status(201).json(curso);

    } catch (err) { next(err); }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const { nome, horasExigidas } = req.body;

      const curso = await Curso.findById(id);

      if (!curso) {
        return res.status(404).json({ erro: 'Curso não encontrado' });
      }

      const cursoAtualizado = await Curso.findByIdAndUpdate(
        id,
        { nome, horasExigidas },
        { new: true, runValidators: true }
      );

      res.json(cursoAtualizado);

    } catch (err) { next(err); }
  },

  async deletar(req, res, next) {
    try {
      const curso = await Curso.findById(req.params.id);

      if (!curso) {
        return res.status(404).json({ erro: 'Curso não encontrado' });
      }

      await Curso.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (err) { next(err); }
  },
};

module.exports = cursoController;