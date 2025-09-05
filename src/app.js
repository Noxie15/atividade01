const express = require('express');
const tarefasRouter = require('./routes/tarefas.routes');

const app = express();
app.use(express.json());
app.use('/tarefas', tarefasRouter);

module.exports = app;