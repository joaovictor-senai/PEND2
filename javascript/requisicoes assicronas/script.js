const buscarUsuarios = document.getElementById("buscarUsuarios");
const resultado = document.getElementById("resultado");
const idUsuario = document.getElementById("idUsuario");

// fetch + then + catch
// buscarUsuarios.addEventListener("click", function() {

//     fetch("https://jsonplaceholder.typicode.com/users")

//         .then(resposta => resposta.json())

//         .then(dados => {

//             resultado.innerHTML = "";

//             dados.forEach(usuario => {

//                 resultado.innerHTML += `
//                     <p>
//                         <strong>${usuario.name}</strong><br>
//                         ${usuario.email}<br>
//                     </p>
//                     <hr>
//                 `;

//             });

//         })

//         .catch(erro => {
//             console.log("erro:", erro);
//         });

// });

// fetch + async + await + try + catch
// buscarUsuarios.addEventListener("click", async function() {
//     try {
//         const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
//         const dados = await resposta.json();

//         resultado.innerHTML = "";

//         dados.forEach(usuario => {
//             resultado.innerHTML += `
//                 <p>
//                     <strong>${usuario.name}</strong><br>
//                     ${usuario.email}<br>
//                 </p>
//                 <hr>
//             `;
//         });
//     } catch (erro) {
//         console.log(erro);
//     }
// });

// com campo de busca
buscarUsuarios.addEventListener("click", async function() {

    const id = idUsuario.value;

    if (id === "") {
        resultado.innerHTML = "Digite um ID";
        return;
    }

    try {
        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const dados = await resposta.json();

        resultado.innerHTML = `
            <p>
                <strong>${dados.name}</strong><br>
                email: ${dados.email}<br>
                Cidade: ${dados.address.city}<br>
                telefone: ${dados.phone}<br>
            </p>
            <hr>
        `;
    } catch (erro) {
        resultado.innerHTML = "erro ao buscar usuário";
        console.log("erro:", erro);
    }
});