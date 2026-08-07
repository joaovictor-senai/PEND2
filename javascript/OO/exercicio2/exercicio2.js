// CLASSE
class aluno {

    //construtor
    constructor(nome, idade, curso, matricula) {
    //this
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.matricula = matricula;
    }
//
aprender() {
    console.log("aluno aprendendo.");
}
//
estudar() {
    console.log("estudando para a prova.");
}
//
apresentar() {
    console.log(`${this.nome} apresentou o trabalho.`);
}


}
const aluno1 = new aluno("Lucas", 20, "Engenharia de Software", "2026001");
console.log("Aluno 1:", aluno1);

//
const aluno2 = new aluno("Mariana", 22, "Administração", "2026002");
console.log("Aluno 2:", aluno2);

//
const aluno3 = new aluno("Gabriel", 19, "Direito", "2026003");
console.log("Aluno 3:", aluno3);


console.log("------------------------------");
console.log("Atributos do aluno 1:");
console.log("- ",aluno1.nome);
console.log("- ",aluno1.idade);
console.log("- ",aluno1.curso);
console.log("- ",aluno1.matricula);
console.log("------------------------------");
//
aluno1.aprender();

//
aluno1.estudar();

aluno1.apresentar();


console.log("------------------------------");
console.log("Atributos do aluno 2:");
console.log("- ",aluno2.nome);
console.log("- ",aluno2.idade);
console.log("- ",aluno2.curso);
console.log("- ",aluno2.matricula);
console.log("------------------------------");
//
aluno2.aprender();

//
aluno2.estudar();

//
aluno2.apresentar();

console.log("------------------------------");
console.log("Atributos do aluno 3:");
console.log("- ",aluno3.nome);
console.log("- ",aluno3.idade);
console.log("- ",aluno3.curso);
console.log("- ",aluno3.matricula);
console.log("------------------------------");

//
aluno3.aprender();

//
aluno3.estudar();

//
aluno3.apresentar();
