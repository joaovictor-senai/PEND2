let caldeiraoIngredientes = [];
let poderTotal = 0;
let xpTotal = 0;
let unlockedRecipes = new Set();
let soundEnabled = true;

const NIVEIS = [
    { limiteXP: 300, titulo: "Aprendiz de Alquimia", nivel: 1 },
    { limiteXP: 800, titulo: "Alquimista Intermediário", nivel: 2 },
    { limiteXP: 1800, titulo: "Mestre dos Elementos", nivel: 3 },
    { limiteXP: Infinity, titulo: "Arquimago Supremo", nivel: 4 }
];

const INGREDIENTES_INFO = {
    fogo: { nome: "Cristal de Fogo", icone: "🔥", cor: { r: 255, g: 87, b: 34 } },
    gelo: { nome: "Essência de Gelo", icone: "❄️", cor: { r: 0, g: 210, b: 255 } },
    estrela: { nome: "Pó de Estrela", icone: "✨", cor: { r: 255, g: 215, b: 0 } },
    sombra: { nome: "Essência Sombria", icone: "🌑", cor: { r: 138, g: 43, b: 226 } },
    agua: { nome: "Lágrima de Sereia", icone: "💧", cor: { r: 0, g: 149, b: 255 } },
    cogumelo: { nome: "Cogumelo Místico", icone: "🍄", cor: { r: 16, g: 185, b: 129 } },
    dragao: { nome: "Escama de Dragão", icone: "🐉", cor: { r: 239, g: 68, b: 68 } },
    tempo: { nome: "Areia do Tempo", icone: "⏳", cor: { r: 245, g: 158, b: 11 } }
};

const DIALOGOS_MAGO = [
    "Misture os ingredientes com sabedoria!",
    "Sentindo o poder do arcano no ar?",
    "Cuidado para não explodir o caldeirão!",
    "Uma pitada de Pó de Estrela faz milagres!",
    "Já consultou o Codex de Receitas hoje?",
    "O conhecimento arcano exige paciência.",
    "Sinto que uma poção lendária vem aí!"
];

const RECEITAS = [
    { id: 'fenix', ingredientes: ['fogo', 'estrela'], nome: "Elixir de Fênix", descricao: "Uma poção flamejante que concede renascimento.", xpBonus: 150 },
    { id: 'geada', ingredientes: ['gelo', 'sombra'], nome: "Veneno de Geada Escura", descricao: "Congela a alma dos inimigos nas trevas.", xpBonus: 120 },
    { id: 'nevoa', ingredientes: ['fogo', 'gelo'], nome: "Névoa Mística de Vapor", descricao: "Gera uma cortina vaporosa capaz de ocultar reinos.", xpBonus: 80 },
    { id: 'eclipse', ingredientes: ['estrela', 'sombra'], nome: "Essência de Eclipse", descricao: "Une a luz das estrelas com a escuridão primordial.", xpBonus: 200 },
    { id: 'geyser', ingredientes: ['agua', 'fogo'], nome: "Poção de Geyser Térmico", descricao: "Explosão de vapor pressurizado devastadora.", xpBonus: 110 },
    { id: 'inverno', ingredientes: ['agua', 'gelo'], nome: "Lágrima do Inverno Glacial", descricao: "Congela instantaneamente corpos d'água.", xpBonus: 130 },
    { id: 'abismo', ingredientes: ['cogumelo', 'sombra'], nome: "Tóxico dos Abismos", descricao: "Infusão fúngica alucinógena de pesadelos.", xpBonus: 140 },
    { id: 'vitalidade', ingredientes: ['cogumelo', 'agua'], nome: "Elixir de Vitalidade Florestal", descricao: "Purifica o organismo e cura feridas profundas.", xpBonus: 100 },
    { id: 'inferno', ingredientes: ['dragao', 'fogo'], nome: "Sopro do Inferno Arcano", descricao: "Chamas dragônicas puras que derretem metal.", xpBonus: 250 },
    { id: 'aceleracao', ingredientes: ['dragao', 'tempo'], nome: "Aceleração Draconiana", descricao: "Concede reflexos e velocidade lendários.", xpBonus: 300 },
    { id: 'eternidade', ingredientes: ['tempo', 'estrela'], nome: "Poção da Eternidade", descricao: "Restaura a juventude e paralisa o tempo.", xpBonus: 280 },
    { id: 'visao', ingredientes: ['cogumelo', 'estrela'], nome: "Soro da Visão Cósmica", descricao: "Abre a visão para outras dimensões.", xpBonus: 160 },
    { id: 'vulcao', ingredientes: ['agua', 'dragao', 'fogo'], nome: "Fúria do Vulcão Subaquático", descricao: "Libera a pressão do centro da terra.", xpBonus: 350 },
    { id: 'cronologico', ingredientes: ['gelo', 'sombra', 'tempo'], nome: "Congelamento Cronológico", descricao: "Paralisa o tempo e o espaço de uma área.", xpBonus: 400 },
    { id: 'ascensao', ingredientes: ['cogumelo', 'dragao', 'estrela'], nome: "Elixir da Ascensão Suprema", descricao: "O ápice absoluto do conhecimento arcano!", xpBonus: 500 }
];

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContextClass ? new AudioContextClass() : null;

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;

    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'drop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
    } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        osc.frequency.setValueAtTime(1046.50, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
    } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'mago') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    }
}

const itens = document.querySelectorAll('.item');
const caldeirao = document.getElementById('caldeirao');
const poderEl = document.getElementById('poder');
const pontosEl = document.getElementById('pontos');
const btnPreparar = document.getElementById('preparar');
const btnLimpar = document.getElementById('limpar');
const liquido = document.getElementById('liquido');
const conteinerNoCaldeirao = document.getElementById('ingredientes-no-caldeirao');
const dicaTexto = document.getElementById('dica-texto');

const xpBarFill = document.getElementById('xp-bar-fill');
const xpTexto = document.getElementById('xp-texto');
const magoTitulo = document.getElementById('mago-titulo');
const magoNivel = document.getElementById('mago-nivel');
const codexCounter = document.getElementById('codex-counter');

const magoElemento = document.getElementById('mago-personagem') ||
    document.getElementById('mago') ||
    document.querySelector('.mago-container') ||
    document.querySelector('.mago');

const magoFalaTexto = document.getElementById('mago-fala');
const magoBalao = document.getElementById('mago-balao');
const modalResultado = document.getElementById('modal-resultado');
const pocaoTitulo = document.getElementById('pocao-titulo');
const pocaoDesc = document.getElementById('pocao-desc');
const badgeDescoberta = document.getElementById('badge-descoberta');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const frascoLiquido = document.getElementById('frasco-liquido');
const modalCodex = document.getElementById('modal-codex');
const btnCodex = document.getElementById('btn-codex');
const btnFecharCodex = document.getElementById('btn-fechar-codex');
const codexGrid = document.getElementById('codex-grid');
const btnAudio = document.getElementById('btn-audio');
const btnResetGame = document.getElementById('btn-reset-game');

let balaoTimeout = null;

if (magoElemento) {
    magoElemento.style.cursor = 'pointer';

    magoElemento.addEventListener('click', () => {
        playSound('mago');

        if (ctx && canvas) {
            const rect = magoElemento.getBoundingClientRect();
            const areaRect = canvas.getBoundingClientRect();

            const cx = (rect.left + rect.width / 2) - areaRect.left;
            const cy = (rect.top + rect.height / 3) - areaRect.top;

            for (let i = 0; i < 15; i++) {
                particles.push(new Particula(cx, cy, '#ffd700', 'estrela'));
            }
        }

        const frase = DIALOGOS_MAGO[Math.floor(Math.random() * DIALOGOS_MAGO.length)];

        if (magoFalaTexto && magoBalao) {
            magoFalaTexto.textContent = frase;
            magoBalao.style.opacity = '1';
            magoBalao.style.transform = 'translateY(0)';

            clearTimeout(balaoTimeout);

            balaoTimeout = setTimeout(() => {
                magoBalao.style.opacity = '0';
                magoBalao.style.transform = 'translateY(-10px)';
            }, 3500);
        } else {
            exibirBalaoFalaDinamico(magoElemento, frase);
        }
    });
}

function exibirBalaoFalaDinamico(alvo, frase) {
    let balao = document.getElementById('balao-fala-dinamico');

    if (!balao) {
        balao = document.createElement('div');
        balao.id = 'balao-fala-dinamico';
        balao.style.position = 'fixed';
        balao.style.backgroundColor = '#2e1065';
        balao.style.color = '#fef08a';
        balao.style.border = '2px solid #eab308';
        balao.style.padding = '8px 14px';
        balao.style.borderRadius = '12px';
        balao.style.fontSize = '0.85rem';
        balao.style.fontWeight = 'bold';
        balao.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
        balao.style.pointerEvents = 'none';
        balao.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        balao.style.zIndex = '1000';
        balao.style.whiteSpace = 'nowrap';

        document.body.appendChild(balao);
    }

    balao.textContent = `🧙‍♂️ "${frase}"`;

    const rect = alvo.getBoundingClientRect();

    balao.style.left = `${rect.left + rect.width / 2}px`;
    balao.style.top = `${rect.top - 45}px`;
    balao.style.transform = 'translate(-50%, 0)';
    balao.style.opacity = '1';

    clearTimeout(balaoTimeout);

    balaoTimeout = setTimeout(() => {
        balao.style.opacity = '0';
        balao.style.transform = 'translate(-50%, -10px)';
    }, 3500);
}

const canvas = document.getElementById('canvas-particulas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];

function redimensionarCanvas() {
    if (!canvas || !canvas.parentElement) return;

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

window.addEventListener('resize', redimensionarCanvas);

class Particula {
    constructor(x, y, corHex, tipo = 'fagulha') {
        this.x = x;
        this.y = y;
        this.cor = corHex;
        this.tipo = tipo;
        this.tamanho = tipo === 'estrela' ? Math.random() * 6 + 4 : Math.random() * 4 + 2;
        this.vx = (Math.random() - 0.5) * (tipo === 'explosao' ? 8 : 4);
        this.vy = tipo === 'splash' ? -(Math.random() * 4 + 2) : (Math.random() - 0.5) * 5 - 1;
        this.gravidade = tipo === 'splash' ? 0.15 : -0.02;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.rotacao = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravidade;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.cor;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotacao);

        if (this.tipo === 'estrela') {
            ctx.beginPath();

            for (let i = 0; i < 4; i++) {
                ctx.lineTo(
                    Math.cos((i * Math.PI) / 2) * this.tamanho,
                    Math.sin((i * Math.PI) / 2) * this.tamanho
                );

                ctx.lineTo(
                    Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.tamanho / 3),
                    Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.tamanho / 3)
                );
            }

            ctx.closePath();
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.tamanho, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

function dispararParticulas(tipo, corHex) {
    if (!ctx || !caldeirao) return;

    const rect = caldeirao.getBoundingClientRect();
    const areaRect = canvas.getBoundingClientRect();

    const cx = (rect.left + rect.width / 2) - areaRect.left;
    const cy = (rect.top + rect.height * 0.4) - areaRect.top;

    const qtd = tipo === 'explosao' ? 50 : 18;
    const cores = [corHex, '#ffd700', '#ffffff', '#a855f7'];

    for (let i = 0; i < qtd; i++) {
        const c = cores[Math.floor(Math.random() * cores.length)];
        const pTipo = tipo === 'explosao'
            ? (Math.random() > 0.4 ? 'estrela' : 'fagulha')
            : 'splash';

        particles.push(new Particula(cx, cy, c, pTipo));
    }
}

function animarParticulas() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);

            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    requestAnimationFrame(animarParticulas);
}

function calcularCorMistura() {
    if (caldeiraoIngredientes.length === 0) {
        return {
            hex: '#4c1d95',
            rgb: '76, 29, 149'
        };
    }

    let r = 0;
    let g = 0;
    let b = 0;

    caldeiraoIngredientes.forEach(item => {
        const info = INGREDIENTES_INFO[item.id];

        if (info && info.cor) {
            r += info.cor.r;
            g += info.cor.g;
            b += info.cor.b;
        }
    });

    const total = caldeiraoIngredientes.length;

    r = Math.round(r / total);
    g = Math.round(g / total);
    b = Math.round(b / total);

    return {
        hex: `rgb(${r}, ${g}, ${b})`,
        rgb: `${r}, ${g}, ${b}`
    };
}

function atualizarCorLiquido() {
    if (!liquido) return;

    const cor = calcularCorMistura();

    liquido.style.backgroundColor = cor.hex;
    liquido.style.boxShadow = `0 0 25px rgba(${cor.rgb}, 0.7), inset 0 5px 15px rgba(255,255,255,0.4)`;
}

function carregarProgresso() {
    try {
        const data = localStorage.getItem('caldeirao_arcano_save');

        if (data) {
            const parsed = JSON.parse(data);

            xpTotal = parsed.xp || 0;
            unlockedRecipes = new Set(parsed.unlocked || []);
        }
    } catch (e) {
        console.error("Erro ao carregar dados salvos:", e);
    }

    atualizarHUD();
}

function salvarProgresso() {
    try {
        const payload = {
            xp: xpTotal,
            unlocked: Array.from(unlockedRecipes)
        };

        localStorage.setItem('caldeirao_arcano_save', JSON.stringify(payload));
    } catch (e) {
        console.error("Erro ao salvar dados:", e);
    }
}

function atualizarHUD() {
    if (pontosEl) pontosEl.textContent = `${xpTotal} XP`;

    let nivelAtual = NIVEIS[0];
    let xpAnterior = 0;

    for (let i = 0; i < NIVEIS.length; i++) {
        if (xpTotal >= NIVEIS[i].limiteXP) {
            xpAnterior = NIVEIS[i].limiteXP;
        } else {
            nivelAtual = NIVEIS[i];
            break;
        }
    }

    if (magoTitulo) magoTitulo.textContent = nivelAtual.titulo;
    if (magoNivel) magoNivel.textContent = `Nv. ${nivelAtual.nivel}`;

    if (xpBarFill && xpTexto) {
        if (nivelAtual.limiteXP === Infinity) {
            xpBarFill.style.width = "100%";
            xpTexto.textContent = `${xpTotal} XP (Nível Máximo)`;
        } else {
            const progresso = ((xpTotal - xpAnterior) / (nivelAtual.limiteXP - xpAnterior)) * 100;

            xpBarFill.style.width = `${Math.min(progresso, 100)}%`;
            xpTexto.textContent = `${xpTotal} / ${nivelAtual.limiteXP} XP`;
        }
    }

    if (codexCounter) {
        codexCounter.textContent = `${unlockedRecipes.size}/${RECEITAS.length}`;
    }
}

itens.forEach(item => {
    item.addEventListener('dragstart', e => {
        const data = {
            id: item.dataset.id,
            nome: item.dataset.nome,
            poder: parseInt(item.dataset.poder) || 0,
            svg: item.querySelector('.icone-box')?.innerHTML || ''
        };

        e.dataTransfer.setData('text/plain', JSON.stringify(data));
    });

    item.addEventListener('click', () => {
        const data = {
            id: item.dataset.id,
            nome: item.dataset.nome,
            poder: parseInt(item.dataset.poder) || 0,
            svg: item.querySelector('.icone-box')?.innerHTML || ''
        };

        adicionarIngrediente(data);
    });
});

if (caldeirao) {
    caldeirao.addEventListener('dragover', e => {
        e.preventDefault();
        caldeirao.classList.add('drag-over');
    });

    caldeirao.addEventListener('dragleave', () => {
        caldeirao.classList.remove('drag-over');
    });

    caldeirao.addEventListener('drop', e => {
        e.preventDefault();
        caldeirao.classList.remove('drag-over');

        try {
            const rawData = e.dataTransfer.getData('text/plain');

            if (rawData) {
                const data = JSON.parse(rawData);
                adicionarIngrediente(data);
            }
        } catch (err) {
            console.error("Erro ao soltar ingrediente:", err);
        }
    });
}

function adicionarIngrediente(item) {
    if (caldeiraoIngredientes.length >= 3) {
        alert("O caldeirão já está cheio! (Máximo de 3 ingredientes)");
        return;
    }

    playSound('drop');

    caldeiraoIngredientes.push(item);
    poderTotal += item.poder;

    const miniIcone = document.createElement('div');

    miniIcone.classList.add('item-no-caldeirao');
    miniIcone.innerHTML = item.svg;

    if (conteinerNoCaldeirao) {
        conteinerNoCaldeirao.appendChild(miniIcone);
    }

    if (dicaTexto) {
        dicaTexto.style.display = 'none';
    }

    if (poderEl) {
        poderEl.textContent = poderTotal;
    }

    if (liquido) {
        const nivelLiquido = 35 + (caldeiraoIngredientes.length * 18);

        liquido.style.height = `${nivelLiquido}%`;

        atualizarCorLiquido();

        liquido.classList.remove('splash-anim');

        void liquido.offsetWidth;

        liquido.classList.add('splash-anim');
    }

    const corHex = INGREDIENTES_INFO[item.id]
        ? INGREDIENTES_INFO[item.id].cor
        : { r: 255, g: 255, b: 255 };

    dispararParticulas(
        'splash',
        `rgb(${corHex.r},${corHex.g},${corHex.b})`
    );

    if (caldeiraoIngredientes.length >= 2 && btnPreparar) {
        btnPreparar.disabled = false;
    }
}

if (btnPreparar) {
    btnPreparar.addEventListener('click', () => {
        const idsAdicionados = caldeiraoIngredientes
            .map(i => i.id)
            .sort();

        const corResult = calcularCorMistura();

        let receitaEncontrada = RECEITAS.find(r => {
            const reqs = [...r.ingredientes].sort();

            return JSON.stringify(reqs) === JSON.stringify(idsAdicionados);
        });

        if (receitaEncontrada) {
            const ehNova = !unlockedRecipes.has(receitaEncontrada.id);

            unlockedRecipes.add(receitaEncontrada.id);
            xpTotal += receitaEncontrada.xpBonus;

            playSound('success');
            dispararParticulas('explosao', corResult.hex);

            exibirResultado(
                receitaEncontrada.nome,
                receitaEncontrada.descricao,
                ehNova,
                corResult.hex
            );
        } else {
            playSound('fail');

            xpTotal += 10;

            exibirResultado(
                "Mistura Malfeita ☣️",
                "Os ingredientes colidiram mal e geraram uma gororoba inútil.",
                false,
                '#3f3f46'
            );
        }

        salvarProgresso();
        atualizarHUD();
        resetaCaldeirao();
    });
}

if (btnLimpar) {
    btnLimpar.addEventListener('click', resetaCaldeirao);
}

function resetaCaldeirao() {
    caldeiraoIngredientes = [];
    poderTotal = 0;

    if (poderEl) poderEl.textContent = "0";
    if (liquido) liquido.style.height = "35%";

    if (conteinerNoCaldeirao) {
        conteinerNoCaldeirao.innerHTML = "";
    }

    if (dicaTexto) {
        dicaTexto.style.display = "block";
    }

    if (btnPreparar) {
        btnPreparar.disabled = true;
    }

    atualizarCorLiquido();
}

function exibirResultado(titulo, desc, ehNova, corHex) {
    if (pocaoTitulo) pocaoTitulo.textContent = titulo;
    if (pocaoDesc) pocaoDesc.textContent = desc;

    if (frascoLiquido) {
        frascoLiquido.setAttribute('fill', corHex);
        frascoLiquido.style.filter = `drop-shadow(0 0 10px ${corHex})`;
    }

    if (badgeDescoberta) {
        if (ehNova) {
            badgeDescoberta.classList.remove('hidden');
        } else {
            badgeDescoberta.classList.add('hidden');
        }
    }

    if (modalResultado) {
        modalResultado.classList.remove('hidden');
    }
}

if (btnFecharModal) {
    btnFecharModal.addEventListener('click', () => {
        if (modalResultado) {
            modalResultado.classList.add('hidden');
        }
    });
}

if (btnCodex) {
    btnCodex.addEventListener('click', renderizarCodex);
}

function renderizarCodex() {
    if (!codexGrid) return;

    codexGrid.innerHTML = '';

    RECEITAS.forEach(r => {
        const desbloqueada = unlockedRecipes.has(r.id);

        const card = document.createElement('div');

        card.className = `codex-card ${desbloqueada ? '' : 'bloqueado'}`;

        const ingsFormatados = r.ingredientes
            .map(id =>
                INGREDIENTES_INFO[id]
                    ? `${INGREDIENTES_INFO[id].icone} ${INGREDIENTES_INFO[id].nome}`
                    : id
            )
            .join(' + ');

        const tagsHTML = r.ingredientes
            .map(id => {
                const inf = INGREDIENTES_INFO[id];

                return inf
                    ? `<span class="badge-tag">${inf.icone} ${inf.nome.split(' ')[0]}</span>`
                    : '';
            })
            .join('');

        const ehLendaria = r.ingredientes.length >= 3;

        card.innerHTML = `
            <h4>${desbloqueada ? r.nome : '???'}</h4>
            <div class="ing-req">${desbloqueada ? ingsFormatados : '🔒 Mistura Oculta'}</div>
            <p>${desbloqueada ? r.descricao : 'Descubra esta poção misturando os ingredientes certos no caldeirão.'}</p>
            ${desbloqueada ? `
                <div class="codex-tags">
                    ${tagsHTML}
                    ${ehLendaria ? '<span class="badge-tag lendario">🌟 Lendária</span>' : ''}
                </div>
            ` : ''}
        `;

        codexGrid.appendChild(card);
    });

    if (modalCodex) {
        modalCodex.classList.remove('hidden');
    }
}

if (btnFecharCodex) {
    btnFecharCodex.addEventListener('click', () => {
        if (modalCodex) {
            modalCodex.classList.add('hidden');
        }
    });
}

if (btnAudio) {
    btnAudio.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        btnAudio.textContent = soundEnabled ? '🔊' : '🔇';
    });
}

if (btnResetGame) {
    btnResetGame.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja apagar todo o seu progresso no jogo?")) {
            localStorage.removeItem('caldeirao_arcano_save');

            xpTotal = 0;
            unlockedRecipes.clear();

            salvarProgresso();
            atualizarHUD();
            renderizarCodex();
        }
    });
}

carregarProgresso();
redimensionarCanvas();
animarParticulas();