const { Router } = require('express');
const router = Router();

let proximoId = 1;
let tarefas = [{ id: proximoId++, titulo: "Primeira tarefa", feito: false }];

router.get('/', (req, res) => {
  res.json(tarefas);
});

router.post('/', (req, res) => {
  const titulo = req.body.titulo || "Sem título";
  const nova = { id: proximoId++, titulo, feito: false };
  tarefas.push(nova);
  res.status(201).json(nova);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return res.status(404).json({ erro: "Não encontrada" });

  if (req.body.titulo) tarefa.titulo = req.body.titulo;
  if (req.body.feito !== undefined) tarefa.feito = req.body.feito;
  res.json(tarefa);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.status(204).send();
});

router.delete('/__reset/all', (req, res) => {
  proximoId = 1;
  tarefas = [{ id: proximoId++, titulo: "Primeira tarefa", feito: false }];
  res.status(204).send();
});

module.exports = router;