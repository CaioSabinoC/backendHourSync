const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ erro: 'Token não informado' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'segredo_super'
    );

    req.user = decoded; // { id, role }

    next();

  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

function autorizar(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ erro: 'Sem permissão' });
    }
    next();
  };
}

module.exports = { autenticar, autorizar };
