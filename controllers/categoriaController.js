const Categoria = require('../models/Categoria');
const Curso = require('../models/Curso');

const categoriaController = {

  async listar(req, res, next) {
    try {
      const categorias = await Categoria.find()
        .populate('cursoId', 'nome');

      res.json(categorias);
    } catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try {
      const categoria = await Categoria.findById(req.params.id)
        .populate('cursoId', 'nome');

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      res.json(categoria);
    } catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try {
      const { nome, cursoId } = req.body;

      if (!nome || !cursoId || cursoId.length === 0) {
        return res.status(400).json({ erro: 'Nome e cursos são obrigatórios' });
      }

      // validar cursos
      const cursos = await Curso.find({ _id: { $in: cursoId } });

      if (cursos.length !== cursoId.length) {
        return res.status(404).json({ erro: 'Um ou mais cursos não existem' });
      }

      const categoria = await Categoria.create({
        nome,
        cursoId
      });

      res.status(201).json(categoria);

    } catch (err) { next(err); }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const { nome, cursoId } = req.body;

      const categoria = await Categoria.findById(id);

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      if (cursoId) {
        const cursos = await Curso.find({ _id: { $in: cursoId } });

        if (cursos.length !== cursoId.length) {
          return res.status(404).json({ erro: 'Um ou mais cursos não existem' });
        }
      }

      const categoriaAtualizada = await Categoria.findByIdAndUpdate(
        id,
        { nome, cursoId },
        { new: true, runValidators: true }
      ).populate('cursoId', 'nome');

      res.json(categoriaAtualizada);

    } catch (err) { next(err); }
  },

  async deletar(req, res, next) {
    try {
      const categoria = await Categoria.findById(req.params.id);

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      await Categoria.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (err) { next(err); }
  },
};

module.exports = categoriaController;