
// Importando as tabelas do DB
const aluno = require('../model/aluno');
const sala = require('../model/sala');

// Utilizado para excluir arquivos
const fs = require('fs');

module.exports = {
    async alunos(req, res){

        // Recebendo o id da URL
        const parametro = req.params.id;

        const alunos = await aluno.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });

        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });
        
        res.render('../views/editarAlunos', {salas, alunos});

    },

    async adicionar(req, res){

        const dados = req.body;
        const id = req.params.id;


        // Se foi enviado alguma foto
        if (req.file) {

            // Recebendo a antiga foto do aluno
            const antigaFoto = await aluno.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDAluno: id }
            });

            // Excluindo a foto da pasta
            if (antigaFoto[0].Foto != 'usuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            // Update da nova foto no DB
            await aluno.update(
                {Foto: req.file.filename},
                {where: { IDAluno: id }}
            );
            
        }

        // Dando upgrade nas informações novas
        await aluno.update({
            Nome: dados.nome,
            Idade: dados.idade,
            Sexo: dados.sexo,
            IDSala: dados.sala
        },
        {
            where: { IDAluno: id }
        });

        res.redirect('/');
        
    },

    async excluirAlunos(req, res){

        const id = req.params.id;

        await aluno.destroy(
            {where: { IDAluno: id }}
        );

        res.redirect('/');

    },

    async excluirSalas(req, res){

        const id = req.params.id;

        await sala.destroy(
            {where: { IDSala: id }}
        );

        res.redirect('/');

    },

    async sala(req, res){

        // Recebendo o id da URL
        const parametro = req.params.id;

        const salas = await sala.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });
        res.render('../views/editarSala', {salas});
    },

    async editarSala(req, res){

        const dados = req.body;
        const id = req.params.id;

        // Dando upgrade nas informações novas
        await sala.update({
            IDSala: dados.sala,
            Nome: dados.nome,
            Capacidade: dados.capacidade
        },
        {
            where: { IDSala: id }
        });

        res.redirect('/');
        
    }
}
