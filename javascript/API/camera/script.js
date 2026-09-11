
const video = document.querySelector("#camera");

const canvas = document.querySelector("#canvas");

const botao = document.querySelector("#tirarfoto");

const foto = document.querySelector("#foto");

navigator.mediaDevices.getUserMedia({

    video: true

})
.then(function(stream) {

    video.srcObject = stream;

})
.catch(function(error) {

    console.log("Nao foi possivel acessar a camera.", error);

});

botao.addEventListener("click", function() {

    canvas.width = video.clientWidth;

    canvas.height = video.clientHeight;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(

        video,

        0,

        0,

        canvas.width,

        canvas.height

    );

    foto.src = canvas.toDataURL("image/png");

});

