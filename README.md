# 🎓 HourSync — Backend

> Sistema de Gestão de Atividades Complementares da Faculdade Senac Pernambuco

[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongoosejs.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com)

---

## 📋 Sobre o Projeto

O **HourSync** é uma plataforma web desenvolvida como Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas (3° período) da Faculdade Senac Pernambuco. O sistema digitaliza e automatiza o processo de gestão de atividades complementares, permitindo que alunos submetam certificados, coordenadores validem as horas e o administrador acompanhe as métricas em tempo real.

### Problema resolvido
Antes do HourSync, o controle de horas complementares era feito manualmente, gerando dificuldades no acompanhamento do progresso dos alunos e na validação dos certificados pelos coordenadores.

---


## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| **Node.js** | 24.x | Runtime JavaScript |
| **Express** | 4.x | Framework web e roteamento |
| **MongoDB** | Atlas | Banco de dados NoSQL |
| **Mongoose** | 8.x | ODM para MongoDB |
| **JWT** | 9.x | Autenticação com tokens |
| **BCryptjs** | 2.x | Criptografia de senhas |
| **Multer** | 2.x | Upload de arquivos |
| **CORS** | 2.x | Controle de origens |
| **Dotenv** | 16.x | Variáveis de ambiente |
| **Nodemon** | 3.x | Hot reload em desenvolvimento |

---

## 📁 Estrutura do Projeto

```
backendHourSync/
├── controllers/
│   ├── atividadeController.js    # CRUD de atividades
│   ├── categoriaController.js    # CRUD de categorias
│   ├── certificadoController.js  # Submissão e validação de certificados
│   ├── cursoController.js        # CRUD de cursos
│   └── usuarioController.js      # CRUD de usuários + login
├── middlewares/
│   ├── auth.js                   # Autenticação JWT e autorização por role
│   └── uploads.js                # Configuração do Multer para upload
├── models/
│   ├── Atividade.js              # Schema de atividades complementares
│   ├── Categoria.js              # Schema de categorias
│   ├── Certificado.js            # Schema de certificados
│   ├── Curso.js                  # Schema de cursos
│   └── Usuario.js                # Schema de usuários
├── routes/
│   ├── atividadeRoutes.js        # Rotas de atividades
│   ├── authRoutes.js             # Rota de login
│   ├── categoriaRoutes.js        # Rotas de categorias
│   ├── certificadoRoutes.js      # Rotas de certificados
│   ├── cursoRoutes.js            # Rotas de cursos
│   └── usuarioRoutes.js          # Rotas de usuários
├── .env.example                  # Modelo de variáveis de ambiente
├── package.json
└── server.js                     # Entrada da aplicação
```

---

## 🔐 Autenticação e Perfis

O sistema usa **JWT (JSON Web Token)** para autenticação. Ao fazer login, o backend retorna um token que deve ser enviado no cabeçalho de todas as requisições protegidas:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

### Perfis de Acesso (Roles)

| Role | Descrição | Permissões |
|---|---|---|
| `SUPER_ADMIN` | Administrador da plataforma | Acesso total ao sistema |
| `COORDENADOR` | Coordenador de curso | Valida certificados do seu curso |
| `ALUNO` | Aluno da instituição | Submete e acompanha seus certificados |

---

## 🗄️ Modelo de Dados

### Usuario
```javascript
{
  nome, email, senha (hash BCrypt), role,
  username, telefone, faculdade, matricula, cpf,
  fotoUrl, ativo, horasCursadas,
  cursoId[] // pode estar em múltiplos cursos
}
```

### Curso
```javascript
{ nome, horasExigidas }
```

### Categoria
```javascript
{ nome, cursoId[] }
```

### Atividade
```javascript
{ nome, codigo, horasPorSemestre, cursoId[], categoriaId }
```

### Certificado
```javascript
{
  titulo, horas, horasAprovadas, dataEmissao, arquivoUrl,
  status (PENDENTE | APROVADO | REJEITADO), justificativa,
  turma, grupo, codigoAtividade, descricaoAtividade,
  alunoId, coordenadorId, categoriaId, atividadeId, cursoId
}
```

---

## 📡 Endpoints da API

### Autenticação
| Método | Rota | Descrição | Token |
|---|---|---|---|
| `POST` | `/api/auth/login` | Login — retorna token JWT | Não |

### Usuários
| Método | Rota | Descrição | Token |
|---|---|---|---|
| `GET` | `/api/usuarios` | Lista todos os usuários | Não |
| `GET` | `/api/usuarios/:id` | Busca usuário por ID | Não |
| `GET` | `/api/usuarios/coordenadores` | Lista coordenadores | Não |
| `GET` | `/api/usuarios/alunos` | Lista alunos | Não |
| `POST` | `/api/usuarios` | Cria novo usuário | Não |
| `PUT` | `/api/usuarios/:id` | Atualiza usuário | Não |
| `PUT` | `/api/usuarios/:id/ativo` | Ativa/inativa usuário | Sim (ADMIN) |
| `DELETE` | `/api/usuarios/:id` | Remove usuário | Sim (ADMIN) |

### Cursos
| Método | Rota | Descrição | Token |
|---|---|---|---|
| `GET` | `/api/cursos` | Lista todos os cursos | Não |
| `GET` | `/api/cursos/:id` | Busca curso por ID | Não |
| `POST` | `/api/cursos` | Cria novo curso | Não |
| `PUT` | `/api/cursos/:id` | Atualiza curso | Não |
| `DELETE` | `/api/cursos/:id` | Remove curso | Não |

### Categorias
| Método | Rota | Descrição | Token |
|---|---|---|---|
| `GET` | `/api/categorias` | Lista todas as categorias | Não |
| `GET` | `/api/categorias/:id` | Busca categoria por ID | Não |
| `POST` | `/api/categorias` | Cria nova categoria | Não |
| `PUT` | `/api/categorias/:id` | Atualiza categoria | Não |
| `DELETE` | `/api/categorias/:id` | Remove categoria | Não |

### Atividades
| Método | Rota | Descrição | Token |
|---|---|---|---|
| `GET` | `/api/atividades` | Lista todas as atividades | Não |
| `GET` | `/api/atividades/:id` | Busca atividade por ID | Não |
| `POST` | `/api/atividades` | Cria nova atividade | Não |
| `PUT` | `/api/atividades/:id` | Atualiza atividade | Não |
| `DELETE` | `/api/atividades/:id` | Remove atividade | Não |

### Certificados
| Método | Rota | Descrição | Token |
|---|---|---|---|
| `GET` | `/api/certificados` | Lista todos os certificados | Não |
| `GET` | `/api/certificados/:id` | Busca certificado por ID | Não |
| `POST` | `/api/certificados` | Submete certificado (com upload) | Não |
| `PUT` | `/api/certificados/:id/status` | Aprova ou rejeita certificado | Não |
| `DELETE` | `/api/certificados/:id` | Remove certificado | Não |

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) 18+
- Conta no [MongoDB Atlas](https://mongodb.com/cloud/atlas) (gratuito)

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/SEU_USUARIO/backendHourSync.git
cd backendHourSync
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/hoursync
JWT_SECRET=hoursync_jwt_secret_2026
PORT=3000
```

**4. Rode o servidor**
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

**5. Teste se está funcionando**

Acesse no navegador:
```
http://localhost:3000
```

Deve retornar:
```json
{ "message": "API HourSync funcionando." }
```

---

## ☁️ Deploy no Render

### 1. Suba o código no GitHub
```bash
git init
git add .
git commit -m "backend hoursync"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/backendHourSync.git
git push -u origin main
```

### 2. Configure o serviço no Render
- Acesse [render.com](https://render.com) e faça login com GitHub
- Clique em **New + → Web Service**
- Conecte o repositório
- Configure:
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`

### 3. Configure as variáveis de ambiente no Render
| Key | Value |
|---|---|
| `MONGO_URI` | Sua URI do MongoDB Atlas |
| `JWT_SECRET` | `hoursync_jwt_secret_2026` |
| `PORT` | `3000` |

---

## 👤 Criar o Usuário Admin

Após o deploy, crie o usuário administrador via Postman ou qualquer cliente HTTP:

**POST** `https://hoursync-backend.onrender.com/api/usuarios`

```json
{
  "nome": "Admin",
  "email": "admin@hoursync.com",
  "senha": "admin123",
  "role": "SUPER_ADMIN",
  "faculdade": "Faculdade Senac Pernambuco",
  "ativo": true
}
```

---

## 📦 Exemplo de Uso

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@hoursync.com",
  "senha": "admin123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "usuario": {
    "id": "...",
    "nome": "Admin",
    "email": "admin@hoursync.com",
    "role": "SUPER_ADMIN"
  }
}
```

### Submeter Certificado
```bash
POST /api/certificados
Content-Type: multipart/form-data

arquivo: [PDF ou imagem]
titulo: "Curso de React"
horas: 20
grupo: "Atividades de Ensino"
codigoAtividade: "1.1"
alunoId: "..."
categoriaId: "..."
cursoId: "..."
```

### Validar Certificado
```bash
PUT /api/certificados/:id/status
Content-Type: application/json
Authorization: Bearer SEU_TOKEN

{
  "status": "APROVADO",
  "justificativa": ""
}
```

---

## 👥 Equipe

| Nome |
|---|
| Arthur Vinicius |
| Marcos Vinicius |
| Thauan Bezerra |
| Caio Sabino |
| José Allamberg |
| Pedro Rodrigues |

**Instituição:** Faculdade Senac Pernambuco  
**Curso:** Análise e Desenvolvimento de Sistemas — 3° Período  
**Ano:** 2026

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como Projeto Integrador da Faculdade Senac Pernambuco.
