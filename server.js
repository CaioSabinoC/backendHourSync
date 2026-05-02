const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'HourSync API Docs',
}));

app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/cursos', require('./routes/cursoRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/atividades', require('./routes/atividadeRoutes'));
app.use('/api/certificados', require('./routes/certificadoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => res.json({ 
  message: 'API HourSync funcionando.',
  docs: '/api-docs'
}));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno do servidor' });
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hoursync')
  .then(() => {
    console.log('Mongo conectado');
    app.listen(process.env.PORT || 3000, () =>
      console.log('Servidor rodando | Docs: http://localhost:3000/api-docs')
    );
  })
  .catch(err => console.error('Erro Mongo:', err));
