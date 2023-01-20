
// Importando as tabelas do DB
const sala = require('../model/sala');
const aluno = require('../model/aluno');


module.exports = {
    async sala(req, res){
        res.render('../views/cadastroSala');
    },

    async salaInsert(req, res){

        const dados = req.body;

        // Criando sala no banco de dados
        await sala.create({
            Nome: dados.nome,
            Capacidade: dados.capacidade
        });

        res.redirect('/');

    },

    async aluno(req, res){
        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome', 'Capacidade'] });

        var lista = [];

        for (s of salas){
            var qtdAlunos = await aluno.count({ raw: true, where : {IDSala : s.IDSala} })
            
            if (qtdAlunos > s.Capacidade){
                lista.push("disabled")
            }

            else {
                lista.push("")
            }
        }
        console.log(lista)
        res.render('../views/cadastroAlunos', {salas, lista});
    },

    async alunoInsert(req, res){
        console.log('helloworld');
        const dados = req.body;

        // Nome padrão da foto
        let foto = 'usuario.png';

        // Verificando se foi enviada alguma foto
        if (req.file) {
            // Pegar novo nome da foto
            foto = req.file.filename;
        }

        // Criando aluno no banco de dados
        await aluno.create({
            Nome: dados.nome,
            Idade: dados.idade,
            Sexo: dados.sexo,
            IDSala: dados.sala,
            Foto: foto
        });

        res.redirect('/');
    }
}
