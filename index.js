const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded ({extended: false}))
app.use(bodyParser.json());


const routeUsuario = require('./src/routes/usuario')
const routeTarefas = require('./src/routes/tarefas')

app.use('/tarefas', routeTarefas)
app.use('/usuario', routeUsuario)


module.exports = app;