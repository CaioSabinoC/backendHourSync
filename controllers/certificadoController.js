const Certificado = require('../models/Certificado');
const Usuario = require('../models/Usuario');
const { enviarEmailCertificado } = require('../services/emailService');
const Curso = require('../models/Curso');
const Categoria = require('../models/Categoria');

const certificadoController = {

  async listar(req, res, next) {
    try {
      const certificados = await Certificado.find()
        .populate('alunoId', 'nome matricula')
        .populate('cursoId', 'nome')
        .populate('categoriaId', 'nome')
        .populate('atividadeId', 'nome horasPorSemestre');

      res.json(certificados);
    } catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try {
      const certificado = await Certificado.findById(req.params.id)
        .populate('alunoId', 'nome')
        .populate('cursoId', 'nome')
        .populate('categoriaId', 'nome');

      if (!certificado) {
        return res.status(404).json({ erro: 'Certificado não encontrado' });
      }

      res.json(certificado);
    } catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try {
      const {
        titulo,
        horas,
        dataEmissao,
        turma,
        grupo,
        codigoAtividade,
        descricaoAtividade,
        alunoId,
        categoriaId,
        cursoId
      } = req.body;

      const arquivoUrl = req.file ? `/uploads/${req.file.filename}` : null;

      if (!titulo || !horas || !alunoId || !categoriaId || !cursoId) {
        return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
      }

      const aluno = await Usuario.findById(alunoId);
      const curso = await Curso.findById(cursoId);
      const categoria = await Categoria.findById(categoriaId);

      if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
      if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
      if (!categoria) return res.status(404).json({ erro: 'Categoria não encontrada' });

      const certificado = await Certificado.create({
        titulo,
        horas,
        dataEmissao,
        turma,
        grupo,
        codigoAtividade,
        descricaoAtividade,
        alunoId,
        categoriaId,
        cursoId,
        arquivoUrl
      });

      res.status(201).json(certificado);

    } catch (err) { next(err); }
  },

  async atualizarStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, justificativa, horasAprovadas, coordenadorId } = req.body;

      const certificado = await Certificado.findById(id);

      if (!certificado) {
        return res.status(404).json({ erro: 'Certificado não encontrado' });
      }

      const statusAnterior = certificado.status;

      certificado.status = status || certificado.status;
      certificado.justificativa = justificativa;
      certificado.horasAprovadas = horasAprovadas;
      certificado.coordenadorId = coordenadorId;

      await certificado.save();

      // Se aprovado agora (e não estava aprovado antes), soma horas ao aluno
      if (status === 'APROVADO' && statusAnterior !== 'APROVADO') {
        const horas = horasAprovadas || certificado.horas || 0;
        await Usuario.findByIdAndUpdate(
          certificado.alunoId,
          { $inc: { horasCursadas: horas } }
        );
      }

      // Enviar email ao aluno
      const aluno = await Usuario.findById(certificado.alunoId);
      if (aluno?.email) {
        await enviarEmailCertificado({
          para: aluno.email,
          nomeAluno: aluno.nome,
          tituloCertificado: certificado.titulo,
          status,
          justificativa,
          horasAprovadas: horasAprovadas || certificado.horas || 0
        });
      }

      res.json(certificado);

    } catch (err) { next(err); }
  },

  async deletar(req, res, next) {
    try {
      const certificado = await Certificado.findById(req.params.id);

      if (!certificado) {
        return res.status(404).json({ erro: 'Certificado não encontrado' });
      }

      await Certificado.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (err) { next(err); }
  },
};

module.exports = certificadoController;
