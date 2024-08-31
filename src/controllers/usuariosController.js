const pool = require('../models/db');

// Listar todos os usuários
const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Usuario');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um usuário por ID
const getUsuarioById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM Usuario WHERE id_usuario = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo usuário
const createUsuario = async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Usuario (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um usuário
const updateUsuario = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Usuario SET nome = $1, email = $2, telefone = $3 WHERE id_usuario = $4 RETURNING *',
      [nome, email, telefone, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir um usuário
const deleteUsuario = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM Usuario WHERE id_usuario = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
