const pool = require('../models/db');

// Listar todos os empréstimos
const getEmprestimos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Emprestimo');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um empréstimo por ID
const getEmprestimoById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM Emprestimo WHERE id_emprestimo = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo empréstimo
const createEmprestimo = async (req, res) => {
  const { data_emprestimo, data_devolucao, id_usuario, id_livro } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Emprestimo (data_emprestimo, data_devolucao, id_usuario, id_livro) VALUES ($1, $2, $3, $4) RETURNING *',
      [data_emprestimo, data_devolucao, id_usuario, id_livro]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um empréstimo
const updateEmprestimo = async (req, res) => {
  const id = parseInt(req.params.id);
  const { data_emprestimo, data_devolucao, id_usuario, id_livro } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Emprestimo SET data_emprestimo = $1, data_devolucao = $2, id_usuario = $3, id_livro = $4 WHERE id_emprestimo = $5 RETURNING *',
      [data_emprestimo, data_devolucao, id_usuario, id_livro, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir um empréstimo
const deleteEmprestimo = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM Emprestimo WHERE id_emprestimo = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEmprestimos,
  getEmprestimoById,
  createEmprestimo,
  updateEmprestimo,
  deleteEmprestimo,
};
