const cidade=document.getElementById("cidade");
const buscar=document.getElementById("buscar");
const resultado=document.getElementById("resultado");
const previsaoDias=document.getElementById("previsao-dias");
const graficoContainer=document.getElementById("grafico-container");
const listaNoticias=document.getElementById("lista-noticias");

let graficoClima=null;

graficoContainer.style.display="none";

buscar.addEventListener("click",buscarClima);

cidade.addEventListener("keydown",e=>{
    if(e.key==="Enter")buscarClima();
});

carregarNoticias();

async function buscarClima(){
    const nome=cidade.value.trim();

    if(!nome){
        resultado.innerHTML="<h3>Digite uma cidade</h3>";
        graficoContainer.style.display="none";
        return;
    }

    resultado.innerHTML="<h3>Consultando...</h3>";

    try{
        const r1=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nome)}&count=1&language=pt&format=json`);
        const local=await r1.json();

        if(!local.results){
            resultado.innerHTML="<h3>Cidade não encontrada</h3>";
            previsaoDias.innerHTML="";
            graficoContainer.style.display="none";
            return;
        }

        const l=local.results[0];

        const r2=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${l.latitude}&longitude=${l.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);

        const dados=await r2.json();
        const c=dados.current;

        resultado.innerHTML=`<div class="clima-principal"><p>${l.name}, ${l.country}</p><div class="clima-centro"><div class="icone-clima ${classeClima(c.weather_code)}"></div><div class="temperatura-atual"><h3>${Math.round(c.temperature_2m)}°</h3><p>${descricaoClima(c.weather_code)}</p></div></div><div class="detalhes-clima"><div><p>Sensação</p><strong>${Math.round(c.apparent_temperature)}°C</strong></div><div><p>Umidade</p><strong>${c.relative_humidity_2m}%</strong></div><div><p>Vento</p><strong>${c.wind_speed_10m} km/h</strong></div></div></div>`;

        mostrarPrevisao(dados.daily);
        mostrarGrafico(dados.daily);

    }catch(e){
        resultado.innerHTML="<h3>Erro ao consultar o clima</h3>";
        previsaoDias.innerHTML="";
        graficoContainer.style.display="none";
    }
}

function mostrarPrevisao(d){
    previsaoDias.innerHTML="";

    for(let i=0;i<5;i++){
        const data=new Date(d.time[i]+"T00:00:00");
        const dia=data.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit"});
        const card=document.createElement("div");

        card.className="card-previsao";

        card.innerHTML=`<p>${dia}</p><div class="icone-previsao ${classeClima(d.weather_code[i])}"></div><h3>${descricaoClima(d.weather_code[i])}</h3><p>${Math.round(d.temperature_2m_max[i])}° / ${Math.round(d.temperature_2m_min[i])}°</p>`;

        previsaoDias.appendChild(card);
    }
}

function mostrarGrafico(d){
    graficoContainer.style.display="block";

    if(graficoClima)graficoClima.destroy();

    graficoClima=new Chart(document.getElementById("grafico-clima"),{
        type:"line",
        data:{
            labels:d.time.slice(0,5).map(x=>new Date(x+"T00:00:00").toLocaleDateString("pt-BR",{weekday:"short"})),
            datasets:[
                {label:"Máxima",data:d.temperature_2m_max.slice(0,5),borderWidth:2},
                {label:"Mínima",data:d.temperature_2m_min.slice(0,5),borderWidth:2}
            ]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false
        }
    });
}

async function carregarNoticias(){
    try{
        const chave="y0Bj9F4e5SDROF5b_BfCTHVvNJASCuTzHEplcbWmecPBMy9C";
        const noticias=[];
        const titulosVistos=new Set();

        const urlGeral=`https://api.currentsapi.services/v1/latest-news?language=pt&apiKey=${chave}`;
        const rGeral=await fetch(urlGeral);

        if(rGeral.ok){
            const dadosGeral=await rGeral.json();
            if(dadosGeral.news?.length){
                dadosGeral.news.forEach(n=>{
                    const tituloBase=n.title.slice(0,25).toLowerCase();
                    if(n.image && n.image !== "None" && n.image.trim() !== "" && !titulosVistos.has(tituloBase)){
                        titulosVistos.add(tituloBase);
                        noticias.push(n);
                    }
                });
            }
        }

        if(noticias.length < 6){
            const urlBusca=`https://api.currentsapi.services/v1/search?language=pt&keywords=brasil&apiKey=${chave}`;
            const rBusca=await fetch(urlBusca);

            if(rBusca.ok){
                const dadosBusca=await rBusca.json();
                if(dadosBusca.news?.length){
                    dadosBusca.news.forEach(n=>{
                        const tituloBase=n.title.slice(0,25).toLowerCase();
                        if(n.image && n.image !== "None" && n.image.trim() !== "" && !titulosVistos.has(tituloBase)){
                            titulosVistos.add(tituloBase);
                            noticias.push(n);
                        }
                    });
                }
            }
        }

        if(!noticias.length) throw new Error("Sem notícias encontradas");

        listaNoticias.innerHTML="";

        noticias.slice(0,6).forEach(n=>{
            const card=document.createElement("article");
            card.className="card-noticia";

            card.innerHTML=`
                <img src="${n.image}" alt="${n.title}" onerror="this.closest('.card-noticia').style.display='none'">
                <p class="fonte-noticia">Brasil · ${new Date(n.published).toLocaleDateString("pt-BR")}</p>
                <h3>${n.title}</h3>
                <p>${n.description || "Confira a notícia completa."}</p>
                <a href="${n.url}" target="_blank" rel="noopener">Ler notícia</a>
            `;

            listaNoticias.appendChild(card);
        });

    }catch(e){
        console.error("Erro nas notícias:",e);
        listaNoticias.innerHTML="<p class='carregando'>Não foi possível carregar as notícias.</p>";
    }
}

function descricaoClima(c){
    if(c===0)return"Céu limpo";
    if(c<=2)return"Parcialmente nublado";
    if(c===3)return"Nublado";
    if(c<=48)return"Neblina";
    if(c<=57)return"Garoa";
    if(c<=67)return"Chuva";
    if(c<=77)return"Neve";
    if(c<=82)return"Pancadas de chuva";
    return"Trovoada";
}

function classeClima(c){
    if(c===0)return"sol";
    if(c<=2)return"parcialmente-nublado";
    if(c<=3)return"nublado";
    if(c<=48)return"neblina";
    if(c<=57)return"garoa";
    if(c<=67)return"chuva";
    if(c<=77)return"neve";
    return"trovoada";
}