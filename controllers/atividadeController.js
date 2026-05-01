const Atividade = require('../models/Atividade');
const Curso = require('../models/Curso');
const Categoria = require('../models/Categoria');

const atividadeController = {

  async listar(req, res, next) {
    try {
      const atividades = await Atividade.find()
        .populate('cursoId', 'nome')
        .populate('categoriaId', 'nome');

      res.json(atividades);
    } catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try {
      const atividade = await Atividade.findById(req.params.id)
        .populate('cursoId', 'nome')
        .populate('categoriaId', 'nome');

      if (!atividade) {
        return res.status(404).json({ erro: 'Atividade não encontrada' });
      }

      res.json(atividade);
    } catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try {
      const { nome, codigo, cursoId, categoriaId, horasPorSemestre } = req.body;

      if (!nome || !codigo || !cursoId || !categoriaId || !horasPorSemestre) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
      }

      const curso = await Curso.findById(cursoId);
      const categoria = await Categoria.findById(categoriaId);

      if (!curso) {
        return res.status(404).json({ erro: 'Curso não encontrado' });
      }

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      const atividade = await Atividade.create({
        nome,
        codigo,
        cursoId,
        categoriaId,
        horasPorSemestre
      });

      res.status(201).json(atividade);

    } catch (err) {
      // trata duplicidade de código (unique)
      if (err.code === 11000) {
        return res.status(400).json({ erro: 'Código já existe' });
      }
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const { nome, codigo, cursoId, categoriaId, horasPorSemestre } = req.body;

      const atividade = await Atividade.findById(id);

      if (!atividade) {
        return res.status(404).json({ erro: 'Atividade não encontrada' });
      }

      if (cursoId) {
        const curso = await Curso.findById(cursoId);
        if (!curso) {
          return res.status(404).json({ erro: 'Curso não encontrado' });
        }
      }

      if (categoriaId) {
        const categoria = await Categoria.findById(categoriaId);
        if (!categoria) {
          return res.status(404).json({ erro: 'Categoria não encontrada' });
        }
      }

      const atividadeAtualizada = await Atividade.findByIdAndUpdate(
        id,
        { nome, codigo, cursoId, categoriaId, horasPorSemestre },
        { new: true, runValidators: true }
      );

      res.json(atividadeAtualizada);

    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ erro: 'Código já existe' });
      }
      next(err);
    }
  },

  async deletar(req, res, next) {
    try {
      const atividade = await Atividade.findById(req.params.id);

      if (!atividade) {
        return res.status(404).json({ erro: 'Atividade não encontrada' });
      }

      await Atividade.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (err) { next(err); }
  },
};

module.exports = atividadeController;