// Cpf, cadastro de clientes, email, senha, telefone
class empresa {

    //construtor
    constructor(nome, setor, anoFundacao, cidade, cpf, email, senha, telefone) {
    //this
    this.nome = nome;
    this.setor = setor;
    this.anoFundacao = anoFundacao;
    this.cidade = cidade;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.clientes = []; 
    }
//
abrir() {
    console.log("empresa aberta.");
}
//
contratar() {
    console.log("contratando funcionários.");
}
//
faturar() {
    console.log(`${this.nome} realizou faturamento.`);
}
// Método para cadastro de clientes
cadastrarCliente(nomeCliente, emailCliente) {
    this.clientes.push({ nome: nomeCliente, email: emailCliente });
    console.log(`Cliente ${nomeCliente} cadastrado com sucesso na ${this.nome}.`);
}


}
const empresa1 = new empresa("TechCorp", "Tecnologia", 2015, "São Paulo", "123.456.789-00", "contato@techcorp.com", "senha123", "(11) 98765-4321");
console.log("Empresa 1:", empresa1);

//
const empresa2 = new empresa("AgroGlobal", "Agricultura", 2010, "Ribeirão Preto", "234.567.890-11", "contato@agroglobal.com", "senha456", "(16) 99123-4567");
console.log("Empresa 2:", empresa2);

//
const empresa3 = new empresa("FoodExpress", "Alimentação", 2020, "Curitiba", "345.678.901-22", "contato@foodexpress.com", "senha789", "(41) 98888-7777");
console.log("Empresa 3:", empresa3);


console.log("------------------------------");
console.log("Atributos da empresa 1:");
console.log("- ",empresa1.nome);
console.log("- ",empresa1.setor);
console.log("- ",empresa1.anoFundacao);
console.log("- ",empresa1.cidade);
console.log("- ",empresa1.cpf);
console.log("- ",empresa1.email);
console.log("- ",empresa1.senha);
console.log("- ",empresa1.telefone);
console.log("------------------------------");
//
empresa1.abrir();

//
empresa1.contratar();

empresa1.faturar();

// Cadastrando cliente na empresa 1
empresa1.cadastrarCliente("Carlos Silva", "carlos@email.com");


console.log("------------------------------");
console.log("Atributos da empresa 2:");
console.log("- ",empresa2.nome);
console.log("- ",empresa2.setor);
console.log("- ",empresa2.anoFundacao);
console.log("- ",empresa2.cidade);
console.log("- ",empresa2.cpf);
console.log("- ",empresa2.email);
console.log("- ",empresa2.senha);
console.log("- ",empresa2.telefone);
console.log("------------------------------");
//
empresa2.abrir();

//
empresa2.contratar();

//
empresa2.faturar();

// Cadastrando cliente na empresa 2
empresa2.cadastrarCliente("Ana Souza", "ana@email.com");

console.log("------------------------------");
console.log("Atributos da empresa 3:");
console.log("- ",empresa3.nome);
console.log("- ",empresa3.setor);
console.log("- ",empresa3.anoFundacao);
console.log("- ",empresa3.cidade);
console.log("- ",empresa3.cpf);
console.log("- ",empresa3.email);
console.log("- ",empresa3.senha);
console.log("- ",empresa3.telefone);
console.log("------------------------------");

//
empresa3.abrir();

//
empresa3.contratar();

//
empresa3.faturar();

// Cadastrando cliente na empresa 3
empresa3.cadastrarCliente("Marcos Lima", "marcos@email.com");
