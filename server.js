const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/cursos', require('./routes/cursoRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/atividades', require('./routes/atividadeRoutes'));
app.use('/api/certificados', require('./routes/certificadoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => res.json({ message: 'API HourSync funcionando.' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo conectado');
    app.listen(process.env.PORT || 3000, () =>
      console.log('Servidor rodando')
    );
  })
  .catch(err => console.error('Erro Mongo:', err));