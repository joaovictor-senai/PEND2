// Cpf, cadastro de clientes, email, senha, telefone -> Versão Premium

// CLASSE PRODUTO
class produto {
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender(quantidade) {
        if (quantidade <= 0) {
            console.log("Quantidade inválida para venda.");
            return;
        }
        if (this.estoque >= quantidade) {
            this.estoque -= quantidade;
            console.log(`Venda realizada: ${quantidade} unidade(s) de ${this.nome}. Estoque atual: ${this.estoque}`);
        } else {
            console.log(`Estoque insuficiente para vender ${quantidade} unidade(s) de ${this.nome}.`);
        }
    }

    repor(quantidade) {
        if (quantidade <= 0) {
            console.log("Quantidade inválida para reposição.");
            return;
        }
        this.estoque += quantidade;
        console.log(`Reposição realizada: ${quantidade} unidade(s) de ${this.nome}. Estoque atual: ${this.estoque}`);
    }

    alterarPreco(novoPreco) {
        if (novoPreco <= 0) {
            console.log("O preço não pode ser zero ou negativo.");
            return;
        }
        this.preco = novoPreco;
        console.log(`O preço do produto ${this.nome} foi alterado para R$ ${this.preco.toFixed(2)}.`);
    }

    aplicarDesconto(porcentagem) {
        if (porcentagem <= 0 || porcentagem > 100) {
            console.log("Porcentagem de desconto inválida.");
            return;
        }
        let valorDesconto = (this.preco * porcentagem) / 100;
        this.preco -= valorDesconto;
        console.log(`Desconto de ${porcentagem}% aplicado em ${this.nome}. Novo preço: R$ ${this.preco.toFixed(2)}`);
    }

    calcularValorEstoque() {
        let total = this.preco * this.estoque;
        console.log(`Valor total em estoque de ${this.nome}: R$ ${total.toFixed(2)}`);
        return total;
    }
}

// CLASSE CLIENTE
class Cliente {
    constructor(nome, cpf, email, senha, telefone) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
    }

    exibirCadastro() {
        console.log("--- Cadastro de Cliente ---");
        console.log(`Nome: ${this.nome}`);
        console.log(`CPF: ${this.cpf}`);
        console.log(`Email: ${this.email}`);
        console.log(`Telefone: ${this.telefone}`);
        console.log("---------------------------");
    }
}

// 
// 
const meuProduto1 = new produto("Notebook", 3500.00, 10);
const meuProduto2 = new produto("Mouse Gamer", 150.00, 50);

//
const clientePremium = new Cliente(
    "João", 
    "123.456.789-00", 
    "joao@email.com", 
    "senha123", 
    "(11) 98888-7777"
);

// 
// 
clientePremium.exibirCadastro();

// 
console.log(`Produto inicial: ${meuProduto1.nome}`);
meuProduto1.vender(2);
meuProduto1.aplicarDesconto(10);
meuProduto1.calcularValorEstoque();

console.log("\n"); //

// Testando o Produto 2
console.log(`Produto inicial: ${meuProduto2.nome}`);
meuProduto2.repor(10);
meuProduto2.alterarPreco(130.00);
meuProduto2.calcularValorEstoque();
