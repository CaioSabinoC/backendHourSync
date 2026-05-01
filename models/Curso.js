const { Schema, model } = require('mongoose');

const cursoSchema = new Schema({
  nome: { type: String, required: true, trim: true },
  horasExigidas: { type: Number, required: true }
}, { timestamps: false });

module.exports = model('Curso', cursoSchema);
