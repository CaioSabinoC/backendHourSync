const { Schema, model } = require('mongoose');

const atividadeSchema = new Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  cursoId: [{ type: Schema.Types.ObjectId, ref: 'Curso', required: true }],
  categoriaId: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  horasPorSemestre: { type: Number, required: true },
 
});

module.exports = model('Atividade', atividadeSchema);