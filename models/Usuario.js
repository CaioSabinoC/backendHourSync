const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  senha: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'COORDENADOR', 'ALUNO'],
    required: true,
  },
  username: { type: String, trim: true },
  telefone: { type: String, trim: true },
  faculdade: { type: String, trim: true },
  matricula: { type: String, trim: true },
  cpf: { type: String, trim: true },
  fotoUrl: { type: String },
  ativo: { type: Boolean, default: true },
  horasCursadas: { type: Number, default: 0 },
  cursoId: [{ type: Schema.Types.ObjectId, ref: 'Curso' }],
}, { timestamps: false });

module.exports = model('Usuario', usuarioSchema);
