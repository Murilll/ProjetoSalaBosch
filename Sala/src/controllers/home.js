const sala = require('../model/sala'); // pega do banco de dados
const aluno = require('../model/aluno');
module.exports = {
    async pagAlunos(req,res){
        res.render('../views/cadastroAlunos.ejs')
    },

    async pagSala(req,res){
        res.render('../views/cadastroSala.ejs')
    }
}
module.exports = {
    async pagInicialget(req, res){

        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });

        res.render('../views/index', {salas, alunos: '', id: '', salasSelecionadas: " "});

    },

    async pagInicialPost(req, res){

        // Pegando os dados da requisição
        const id = req.body.nome;

        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Foto'],
            where: { IDSala: id }
        });

        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });

        
        const salasSelecionadas = await sala.findByPk(id, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });

        console.log(salasSelecionadas)
        res.render('../views/index', {salas, alunos, id, salasSelecionadas});
    }
}



