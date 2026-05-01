const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema({
  nome: { type: String, required: true, trim: true },
  cursoId: [{ type: Schema.Types.ObjectId, ref: 'Curso', required: true }]
}, { timestamps: false });

module.exports = model('Categoria', categoriaSchema);
