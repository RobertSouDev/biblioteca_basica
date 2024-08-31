const express = require('express');
const app = express();

const livrosRoutes = require('./routes/livrosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const emprestimosRoutes = require('./routes/emprestimosRoutes');

app.use(express.json());

app.use('/livros', livrosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/emprestimos', emprestimosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
