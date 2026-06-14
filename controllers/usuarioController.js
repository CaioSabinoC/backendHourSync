const Usuario = require('../models/Usuario');
const Curso = require('../models/Curso');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const usuarioController = {

  async listar(req, res, next) {
    try {
      const usuarios = await Usuario.find()
        .populate('cursoId', 'nome');

      res.json(usuarios);
    } catch (err) { next(err); }
  },

  async listarCoordenadores(req, res, next) {
    try {
      const usuarios = await Usuario.find({ role: 'COORDENADOR' })
        .populate('cursoId', 'nome');

      res.json(usuarios);
    } catch (err) { next(err); }
  },

  async listarAlunos(req, res, next) {
    try {
      const usuarios = await Usuario.find({ role: 'ALUNO' })
        .populate('cursoId', 'nome horasExigidas');

      res.json(usuarios);
    } catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try {
      const usuario = await Usuario.findById(req.params.id)
        .populate('cursoId', 'nome')
        .select('+senha');

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      res.json(usuario);
    } catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try {
      const {
        nome, email, senha, role, username,
        telefone, faculdade, matricula, cpf, cursoId
      } = req.body;

      if (!nome || !email || !senha || !role) {
        return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
      }

      if (cursoId) {
        const curso = await Curso.findById(cursoId);
        if (!curso) {
          return res.status(404).json({ erro: 'Curso não encontrado' });
        }
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const usuario = await Usuario.create({
        nome, email, senha: senhaHash, role, username,
        telefone, faculdade, matricula, cpf, cursoId
      });

      res.status(201).json(usuario);

    } catch (
