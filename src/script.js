var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ascenderLuzTrianguloCima, apagarLuzTrianguloCima, ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, } from './luzes.js';
import { numeroAleatorio, piscarLuz, habilitarBotoes } from './utils.js';
let vezJogador = false;
let qtdAcertos = 0;
let sequenciaMaquina = [];
let sequenciaJogador = [];
let jogadorAtual = '';
const maximoDeNumerosAleatorio = 4;
const tempoLuzAcesa = {
    CLIQUE_JOGADOR: 500,
    FACIL: 1000,
    MEDIO: 500,
    DIFICIL: 300,
};
let dificuldadeSelecionada = tempoLuzAcesa.FACIL;
const modal = document.getElementById('modal');
const menuStart = document.getElementById('menu-redondo');
const botaoAbrirModalInicioPartida = document.getElementById('botao-comecar-jogo');
const botaoReabrirModalInicioPartida = document.getElementById('botao-novo-jogador');
const botaoNovaTentativa = document.getElementById('botao-tentar-novamente');
const containerReiniciarJogo = document.getElementById('container-reset-jogo');
const botaoFecharModal = document.getElementById('fechar-modal');
const formInicioJogo = document.getElementById('form-inicio-jogo');
const botaoTopo = document.getElementById('botao-cima');
const botaoBaixo = document.getElementById('botao-baixo');
const botaoEsquerda = document.getElementById('botao-esquerda');
const botaoDireita = document.getElementById('botao-direita');
document.addEventListener('DOMContentLoaded', () => {
    botaoTopo === null || botaoTopo === void 0 ? void 0 : botaoTopo.addEventListener('click', () => {
        piscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarJogadaJogador(1);
    });
    botaoBaixo === null || botaoBaixo === void 0 ? void 0 : botaoBaixo.addEventListener('click', () => {
        piscarLuz(ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarJogadaJogador(2);
    });
    botaoEsquerda === null || botaoEsquerda === void 0 ? void 0 : botaoEsquerda.addEventListener('click', () => {
        piscarLuz(ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarJogadaJogador(3);
    });
    botaoDireita === null || botaoDireita === void 0 ? void 0 : botaoDireita.addEventListener('click', () => {
        piscarLuz(ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarJogadaJogador(4);
    });
});
function validarJogadaJogador(jogada) {
    if (!vezJogador)
        return;
    console.log({ jogada });
    console.log(sequenciaMaquina[sequenciaMaquina.length - 1]);
    if (sequenciaMaquina[sequenciaMaquina.length - 1] !== jogada) {
        vezJogador = false;
        habilitarBotoes(vezJogador);
        qtdAcertos = sequenciaMaquina.length;
        sequenciaJogador = [];
        sequenciaMaquina = [];
        paragrafoAvisoInicioJogo.innerText = `Game Over! ${jogadorAtual}, sua pontuação foi: ${qtdAcertos}`;
        setTimeout(() => {
            paragrafoAvisoInicioJogo.innerText =
                'Desanima não! Bora pra mais uma tentativa.';
        }, 5000);
        setTimeout(() => {
            paragrafoAvisoInicioJogo.innerText = '';
            containerReiniciarJogo.classList.remove('display');
        }, 10000);
        return;
    }
    // const indiceAtual = sequenciaMaquina.length - (sequenciaMaquina.length - sequenciaMaquina.indexOf(numero));
    // if (numero === sequenciaMaquina[indiceAtual]) {
    //   if (indiceAtual === sequenciaMaquina.length - 1) {
    //     vezJogador = false;
    //     habilitarBotoes(vezJogador);
    //     setTimeout(() => {
    //       avisoInicioPartida();
    //     }, 1000);
    //   }
    // } else {
    //   alert(`Game Over! ${jogadorAtual}, sua pontuação foi: ${sequenciaMaquina.length - 1}`);
    //   // Reiniciar o jogo
    //   sequenciaMaquina = [];
    //   vezJogador = false;
    //   habilitarBotoes(vezJogador);
    //   paragrafoAvisoInicioJogo.innerText = "Jogo reiniciado! Clique em 'Começar' para jogar novamente.";
    //   botaoAbrirModalInicioPartida.classList.remove('display');
    // }
}
function jogadaMaquina() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const numero of sequenciaMaquina) {
            switch (numero) {
                case 1:
                    yield piscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, dificuldadeSelecionada);
                    break;
                case 2:
                    yield piscarLuz(ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, dificuldadeSelecionada);
                    break;
                case 3:
                    yield piscarLuz(ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, dificuldadeSelecionada);
                    break;
                case 4:
                    yield piscarLuz(ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, dificuldadeSelecionada);
                    break;
            }
            vezJogador = true;
            yield new Promise((resolve) => setTimeout(resolve, 200));
            habilitarBotoes(vezJogador);
        }
        paragrafoAvisoInicioJogo.innerText = 'Sua vez!';
    });
}
botaoAbrirModalInicioPartida.addEventListener('click', () => {
    modal.classList.remove('hidden');
});
botaoReabrirModalInicioPartida.addEventListener('click', () => {
    modal.classList.remove('hidden');
});
botaoNovaTentativa.addEventListener('click', () => {
    avisoReinicioPartida();
    containerReiniciarJogo.classList.add('display');
});
botaoFecharModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});
const paragrafoAvisoInicioJogo = document.createElement('p');
menuStart.append(paragrafoAvisoInicioJogo);
function avisoReinicioPartida() {
    sequenciaMaquina.push(numeroAleatorio(maximoDeNumerosAleatorio));
    paragrafoAvisoInicioJogo.innerText =
        'Boaaa! Desiste não, agora você vai destruir...';
    setTimeout(() => {
        paragrafoAvisoInicioJogo.innerText = 'Observe atentamente a sequencia';
        setTimeout(() => {
            jogadaMaquina();
        }, 2000);
    }, 3000);
}
function avisoInicioPartida() {
    const mensagemDeEscolha = {
        [tempoLuzAcesa.FACIL]: 'Ótima escolha para praticar!',
        [tempoLuzAcesa.MEDIO]: 'Isso ai! Vamos evoluir.',
        [tempoLuzAcesa.DIFICIL]: 'Hora de se desafiar !',
    };
    const mensagemDeInicioDefinitivo = {
        [tempoLuzAcesa.FACIL]: 'Fique tranquilo, as luzes vão ascender lentamente...',
        [tempoLuzAcesa.MEDIO]: 'Bora lá, você ja sabe como funciona né...',
        [tempoLuzAcesa.DIFICIL]: 'Nem pisca pra não perder a sequencia em...',
    };
    sequenciaMaquina.push(numeroAleatorio(maximoDeNumerosAleatorio));
    botaoAbrirModalInicioPartida.classList.add('display');
    paragrafoAvisoInicioJogo.innerText =
        mensagemDeEscolha[dificuldadeSelecionada] || 'Ótima Escolha !';
    setTimeout(() => {
        paragrafoAvisoInicioJogo.innerText =
            mensagemDeInicioDefinitivo[dificuldadeSelecionada] ||
                'A partida vai começar em breve...';
        setTimeout(() => {
            paragrafoAvisoInicioJogo.innerText = 'Observe atentamente a sequencia';
            setTimeout(() => {
                jogadaMaquina();
            }, 2000);
        }, 3000);
    }, 4000);
}
formInicioJogo.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const dificuldade = document.getElementById('dificuldade').value;
    if (dificuldade === 'FACIL') {
        dificuldadeSelecionada = tempoLuzAcesa.FACIL;
    }
    else if (dificuldade === 'MEDIO') {
        dificuldadeSelecionada = tempoLuzAcesa.MEDIO;
    }
    else {
        dificuldadeSelecionada = tempoLuzAcesa.DIFICIL;
    }
    jogadorAtual = nome;
    containerReiniciarJogo.classList.add('display');
    modal.classList.add('hidden');
    avisoInicioPartida();
    console.log({ jogadorAtual });
    console.log({ dificuldadeSelecionada });
});
// jogadaMaquina();
//# sourceMappingURL=script.js.map