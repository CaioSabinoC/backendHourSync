const { Schema, model } = require('mongoose');

const certificadoSchema = new Schema({
  titulo: { type: String, required: true, trim: true },
  horas: { type: Number, required: true },
  dataEmissao: { type: Date },
  arquivoUrl: { type: String },
  status: {
    type: String,
    enum: ['PENDENTE', 'APROVADO', 'REJEITADO'],
    default: 'PENDENTE',
    required: true,
  },
  justificativa: { type: String },
  turma: { type: String },
  grupo: { type: String },
  codigoAtividade: { type: String },
  descricaoAtividade: { type: String },
  horasAprovadas: { type: Number },
  criadoEm: { type: Date, default: Date.now },
  alunoId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  coordenadorId: { type: Schema.Types.ObjectId, ref: 'Usuario', default: null },
  categoriaId: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  atividadeId: { type: Schema.Types.ObjectId, ref: 'Atividade', default: null },
  cursoId: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
}, { timestamps: false });

certificadoSchema.index({ alunoId: 1 });
certificadoSchema.index({ cursoId: 1, status: 1 });

module.exports = model('Certificado', certificadoSchema);
