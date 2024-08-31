const pool = require('../models/db');

const getLivros = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Livro');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getLivroById = async (req, res) => {
    const id = parseInt(req.params.id)
    try{
        const result = await pool.query('SELECT * FROM Livros WHERE id_livro = $1', [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const createLivro = async (req, res) =>{
    const { titulo, autor, ano_publicacao, categoria } = req.body
    try {
        const result = await pool.query(
          'INSERT INTO Livro (titulo, autor, ano_publicacao, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
          [titulo, autor, ano_publicacao, categoria]
        );
        res.status(201).json(result.rows[0]);
    }catch (error){
        res.status(500).json({ error: error.message})
    }
}

const updateLivro = async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, ano_publicacao, categoria} = req.body
    try {
        const result = await pool.query(
            'UPDATE Livro SET titulo = $1, autor = $2, ano_publicacao = $3, categoria = $4 WHERE id_livro = $5 RETURNING *',
            [titulo, autor, ano_publicacao, categoria, id]
        )
        res.status(200),json(result.rows[0])
    }catch (error) {
        res.status(500).json({error: error.message })
    }

}

const deleteLivro = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        await pool.query('DELETE FROM Livro WHERE id_livro = $1', [id])
        res.status(204).send()

    } catch (error) {
        res.status(500).json({ error: error.message})
    }

}

module.exports = {
    getLivros,
    getLivroById,
    createLivro,
    updateLivro,
    deleteLivro,
  };