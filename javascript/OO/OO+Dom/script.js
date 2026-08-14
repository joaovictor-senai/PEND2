class Aluno {
    constructor(nome, idade, curso, matricula) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.matricula = matricula;
    }

    estudar() {
        console.log(`${this.nome} está estudando`);
    }
    
    apresentar() {
        console.log(`${this.nome} esta fazendo uma otima apresentação!`);
    }

    exibirNaTela() {

        const resultado = document.querySelector('#resultado');
         
        resultado.innerHTML = "";

        alunos.forEach(aluno => {
            
            resultado.innerHTML += `
            <div>
                <p>Nome: ${aluno.nome}</p>
                <p>Idade: ${aluno.idade}</p>
                <p>Curso: ${aluno.curso}</p>
                <p>Matrícula: ${aluno.matricula}</p>
            </div>
            `;
        });

        resultado.innerHTML = `
        <p>nome: ${this.nome}</p>
        <p>idade: ${this.idade}</p>
        <p>curso: ${this.curso}</p>
        <p>matricula: ${this.matricula}</p>
        `;
    }
}

class Turma {
    constructor() {
        this.alunos = [];
    }
    
    exibirNaTela() {

        const resultado = document.querySelector('#resultado');

        resultado.innerHTML = "";

        this.alunos.forEach(aluno => {

            resultado.innerHTML += `
            <div>
                <p>Nome: ${aluno.nome}</p>
                <p>Idade: ${aluno.idade}</p>
                <p>Curso: ${aluno.curso}</p>
                <p>Matrícula: ${aluno.matricula}</p>
            </div>
            `;
        });
    }
}

const alunos = [];

const nome = document.querySelector('#nome');
const botaocadastrar = document.querySelector('#botaocadastrar');
const idade = document.querySelector('#idade');
const matricula = document.querySelector('#matricula');
const curso = document.querySelector('#curso');

botaocadastrar.addEventListener('click', function() {

    const aluno = new Aluno(nome.value, idade.value, curso.value, matricula.value);
    
    alunos.push(aluno);
    console.log(alunos);
    aluno.exibirNaTela();
});