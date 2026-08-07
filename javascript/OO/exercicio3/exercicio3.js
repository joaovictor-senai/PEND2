// CLASSE
class produto {

    //construtor
    constructor(nome, preco, estoque) {
        //this
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    // Métodos
    vender(quantidade) {
        if (this.estoque >= quantidade) {
            this.estoque -= quantidade;
            console.log(`Venda realizada: ${quantidade} unidade(s) de ${this.nome}.`);
        } else {
            console.log(`Estoque insuficiente para ${this.nome}.`);
        }
    }

    repor(quantidade) {
        this.estoque += quantidade;
        console.log(`Reposição de ${quantidade} unidade(s) em ${this.nome}.`);
    }

    aplicarDesconto(porcentagem) {
        let valorDesconto = (this.preco * porcentagem) / 100;
        this.preco -= valorDesconto;
        console.log(`Desconto de ${porcentagem}% aplicado em ${this.nome}.`);
    }
}

//
const produto1 = new produto("Smartphone", 2500.00, 15);
console.log("Produto 1:", produto1);

const produto2 = new produto("Teclado Mecânico", 350.00, 20);
console.log("Produto 2:", produto2);

const produto3 = new produto("Monitor 4K", 1800.00, 8);
console.log("Produto 3:", produto3);


// --- PRODUTO 1 ---
console.log("------------------------------");
console.log("Atributos do produto 1:");
console.log("- Nome: ", produto1.nome);
console.log("- Preço: R$", produto1.preco.toFixed(2));
console.log("- Estoque: ", produto1.estoque);
console.log("------------------------------");
produto1.vender(3);
produto1.aplicarDesconto(10);
console.log("Novo preço após desconto: R$", produto1.preco.toFixed(2));


// --- PRODUTO 2 ---
console.log("------------------------------");
console.log("Atributos do produto 2:");
console.log("- Nome: ", produto2.nome);
console.log("- Preço: R$", produto2.preco.toFixed(2));
console.log("- Estoque: ", produto2.estoque);
console.log("------------------------------");
produto2.repor(10);
produto2.vender(5);


// --- PRODUTO 3 ---
console.log("------------------------------");
console.log("Atributos do produto 3:");
console.log("- Nome: ", produto3.nome);
console.log("- Preço: R$", produto3.preco.toFixed(2));
console.log("- Estoque: ", produto3.estoque);
console.log("------------------------------");
produto3.vender(10); // Teste de estoque insuficiente
produto3.aplicarDesconto(15);
