// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Iniciando Multer
const multer = require("multer");
// Recebendo arquivo do multer que criamos
const config = require('./src/config/multer');

// Importando os Controllers
const home = require('./src/controllers/home');
const cadastro = require('./src/controllers/cadastro');
const editar = require('./src/controllers/editar');

// // Iniciando as rotas
route.get('/', home.pagInicialget);
route.post('/', home.pagInicialPost);
route.post('/excluirSalas/:id', editar.excluirSalas);

route.get('/cadastroAlunos', cadastro.aluno);
// Cadastro de aluno irá receber um arquivo com o "name" do HTML chamado de "foto"
route.post('/cadastroAlunos', multer(config).single('foto'), cadastro.alunoInsert); 

// //importando o cadastro js no routes
route.get('/cadastroSala', cadastro.sala);
route.post('/cadastroSala', cadastro.salaInsert);

route.get('/editarAlunos/:id', editar.alunos);
route.post('/excluirAlunos/:id', editar.excluirAlunos);
route.post('/editarAlunos/:id', multer(config).single('foto'), editar.adicionar);

route.get('/editarSala/:id', editar.sala);
route.post('/editarSala/:id', editar.editarSala);

module.exports = route;