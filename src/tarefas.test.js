const request = require('supertest');
const app = require('../src/app');

beforeEach(async () => {
  await request(app).delete('/tarefas/__reset/all');
});

test('GET /tarefas retorna lista', async () => {
  const res = await request(app).get('/tarefas');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test('POST /tarefas cria tarefa', async () => {
  const res = await request(app).post('/tarefas').send({ titulo: 'Nova tarefa' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body.titulo).toBe('Nova tarefa');
  expect(res.body.feito).toBe(false);
});

test('PUT /tarefas/:id atualiza tarefa', async () => {
  const create = await request(app).post('/tarefas').send({ titulo: 'Antiga' });
  const id = create.body.id;

  const res = await request(app).put(`/tarefas/${id}`).send({ titulo: 'Atualizada', feito: true });
  expect(res.status).toBe(200);
  expect(res.body.titulo).toBe('Atualizada');
  expect(res.body.feito).toBe(true);
});

test('DELETE /tarefas/:id remove tarefa', async () => {
  const create = await request(app).post('/tarefas').send({ titulo: 'Apagar' });
  const id = create.body.id;

  const del = await request(app).delete(`/tarefas/${id}`);
  expect(del.status).toBe(204);

  const list = await request(app).get('/tarefas');
  expect(list.body.some(t => t.id === id)).toBe(false);
});