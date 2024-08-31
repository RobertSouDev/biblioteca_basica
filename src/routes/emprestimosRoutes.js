const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/emprestimosController');

router.get('/', emprestimosController.getEmprestimos);
router.get('/:id', emprestimosController.getEmprestimoById);
router.post('/', emprestimosController.createEmprestimo);
router.put('/:id', emprestimosController.updateEmprestimo);
router.delete('/:id', emprestimosController.deleteEmprestimo);

module.exports = router;
