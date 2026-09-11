const pinStatus = document.getElementById("pin-status");
const pinTexto = document.getElementById("pin-texto");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const precisao = document.getElementById("precisao");

const botaoCamera = document.getElementById("abrir-camera");
const botaoFoto = document.getElementById("tirar-foto");
const botaoConfirmar = document.getElementById("confirmar-registro");

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const fotoPreview = document.getElementById("foto-preview");

const pinSucessoSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ea1d2c'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>";

const pinErroSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ea1d2c'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>";

let map = null;
let markerEntregador = null;
let circlePrecisao = null;

let streamAtivo = null;
let fotoCapturada = null;
let coordsAtuais = null;


function inicializarMapa() {

    const posPadrao = [-23.55052, -46.633308];

    map = L.map("map", {
        zoomControl: false
    }).setView(posPadrao, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    L.control.zoom({
        position: "topright"
    }).addTo(map);

    const iconeMotoboy = L.divIcon({
        className: "custom-motoboy-marker",
        html: `<div class="motoboy-icon">🛵</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });

    markerEntregador = L.marker(posPadrao, {
        icon: iconeMotoboy
    }).addTo(map);
}


function iniciarRastreamentoTempoReal() {

    if (!navigator.geolocation) {

        latitude.textContent = "Não disponível";
        longitude.textContent = "Não disponível";
        precisao.textContent = "Não disponível";
        pinTexto.textContent = "Geolocalização não suportada.";

        return;
    }

    navigator.geolocation.watchPosition(

        function (posicao) {

            const lat = posicao.coords.latitude;
            const lng = posicao.coords.longitude;
            const acc = posicao.coords.accuracy;

            coordsAtuais = {
                lat,
                lng,
                acc
            };

            latitude.textContent = lat.toFixed(6);
            longitude.textContent = lng.toFixed(6);
            precisao.textContent = acc.toFixed(1) + " metros";

            const novaPosicao = [lat, lng];

            markerEntregador.setLatLng(novaPosicao);

            map.panTo(novaPosicao, {
                animate: true,
                duration: 0.8
            });

            if (circlePrecisao) {

                circlePrecisao.setLatLng(novaPosicao);
                circlePrecisao.setRadius(acc);

            } else {

                circlePrecisao = L.circle(novaPosicao, {
                    radius: acc,
                    color: "#ea1d2c",
                    fillColor: "#ea1d2c",
                    fillOpacity: 0.15,
                    weight: 1
                }).addTo(map);
            }

            pinStatus.src = pinSucessoSVG;
            pinStatus.classList.remove("oculto");

            pinTexto.textContent = "Rastreando em tempo real";

            validarFormulario();
        },

        function (erro) {

            latitude.textContent = "Permissão negada";
            longitude.textContent = "Permissão negada";
            precisao.textContent = "Permissão negada";

            pinStatus.src = pinErroSVG;
            pinStatus.classList.remove("oculto");

            pinTexto.textContent = "Sinal de GPS perdido ou negado.";
        },

        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        }
    );
}


botaoCamera.addEventListener("click", async function () {

    if (streamAtivo) {

        fecharCamera();

        return;
    }

    try {

        streamAtivo = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = streamAtivo;

        video.classList.remove("oculto");

        fotoPreview.classList.add("oculto");

        botaoCamera.textContent = "Fechar Câmera";

        botaoFoto.classList.remove("oculto");
        botaoFoto.disabled = false;

    } catch (erro) {

        alert("Não foi possível acessar a câmera.");

        console.error(erro);
    }
});


botaoFoto.addEventListener("click", function () {

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    fotoCapturada = canvas.toDataURL("image/jpeg");

    fotoPreview.src = fotoCapturada;

    fotoPreview.classList.remove("oculto");

    video.classList.add("oculto");

    fecharCamera();

    validarFormulario();
});


function fecharCamera() {

    if (streamAtivo) {

        streamAtivo.getTracks().forEach(track => track.stop());

        streamAtivo = null;
    }

    botaoCamera.textContent = "Abrir Câmera";

    botaoFoto.classList.add("oculto");
}


function validarFormulario() {

    if (coordsAtuais && fotoCapturada) {

        botaoConfirmar.disabled = false;
    }
}


botaoConfirmar.addEventListener("click", function () {

    alert("Registro efetuado com sucesso!");
});


window.onload = function () {

    inicializarMapa();

    iniciarRastreamentoTempoReal();
};