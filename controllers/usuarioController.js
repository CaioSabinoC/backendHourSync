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
        .select('+senha'); // opcional

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      res.json(usuario);
    } catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try {
      const {
        nome,
        email,
        senha,
        role,
        username,
        telefone,
        faculdade,
        matricula,
        cpf,
        cursoId
      } = req.body;

      if (!nome || !email || !senha || !role) {
        return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
      }

      // valida curso (se enviado)
      if (cursoId) {
        const curso = await Curso.findById(cursoId);
        if (!curso) {
          return res.status(404).json({ erro: 'Curso não encontrado' });
        }
      }

      // hash da senha
      const senhaHash = await bcrypt.hash(senha, 10);

      const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        role,
        username,
        telefone,
        faculdade,
        matricula,
        cpf,
        cursoId
      });

      res.status(201).json(usuario);

    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ erro: 'Email já cadastrado' });
      }
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      if (dados.cursoId) {
        const curso = await Curso.findById(dados.cursoId);
        if (!curso) {
          return res.status(404).json({ erro: 'Curso não encontrado' });
        }
      }

      // se atualizar senha
      if (dados.senha) {
        dados.senha = await bcrypt.hash(dados.senha, 10);
      }

      const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        id,
        dados,
        { new: true, runValidators: true }
      ).populate('cursoId', 'nome');

      res.json(usuarioAtualizado);

    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ erro: 'Email já cadastrado' });
      }
      next(err);
    }
  },

  async alterarStatus(req, res, next) {
    try {
      const { id } = req.params;
      const ativo = req.query.ativo === 'true';

      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      usuario.ativo = ativo;
      await usuario.save();

      res.json(usuario);

    } catch (err) { next(err); }
  },

  async deletar(req, res, next) {
    try {
      const usuario = await Usuario.findById(req.params.id);

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      await Usuario.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (err) { next(err); }
  },

  async login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        role: usuario.role
      },
      process.env.JWT_SECRET || 'segredo_super',
      { expiresIn: '1d' }
    );

    res.json({
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      },
      token
    });

  } catch (err) { next(err); }
},
};

module.exports = usuarioController;
