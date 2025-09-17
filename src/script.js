var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { habilitarBotoes } from './funcoes-utilitarias/habilitar-botoes/habilitarBotoes.js';
import { geradorDeNumeroAleatorio } from './funcoes-utilitarias/numeros-aleatorios/geradorDeNumeroAleatorio.js';
import { funcaoPiscarLuz } from './funcoes-utilitarias/piscar-luz/funcaoPiscarLuz.js';
import { addPontuacaoAtual } from './funcoes-utilitarias/pontuacao-atual/addPontuacaoAtual.js';
import { atualizaRankingJogador, exibirRanking, obterRanking } from './funcoes-utilitarias/valida-ranking/verificaPosicaoNoRanking.js';
// import { verificaPosicaoNoRanking } from './funcoes-utilitarias/valida-ranking/verificaPosicaoNoRanking.js';
import { ascenderLuzTrianguloCima, apagarLuzTrianguloCima, ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, } from './luzes.js';
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
const rankingInicial = obterRanking();
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
const pontuacaoAtual = document.getElementById('pontos-atuais');
const ultimosPontos = document.getElementById('ultimos-pontos');
let ultimaPontuacao = localStorage.getItem('ultimaPontuacao') || '0';
document.addEventListener('DOMContentLoaded', () => {
    exibirRanking(rankingInicial);
    ultimosPontos.innerHTML = ultimaPontuacao.toString();
    botaoTopo === null || botaoTopo === void 0 ? void 0 : botaoTopo.addEventListener('click', () => {
        funcaoPiscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarSequenciaJogador(1);
    });
    botaoBaixo === null || botaoBaixo === void 0 ? void 0 : botaoBaixo.addEventListener('click', () => {
        funcaoPiscarLuz(ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarSequenciaJogador(2);
    });
    botaoEsquerda === null || botaoEsquerda === void 0 ? void 0 : botaoEsquerda.addEventListener('click', () => {
        funcaoPiscarLuz(ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarSequenciaJogador(3);
    });
    botaoDireita === null || botaoDireita === void 0 ? void 0 : botaoDireita.addEventListener('click', () => {
        funcaoPiscarLuz(ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, tempoLuzAcesa.CLIQUE_JOGADOR);
        validarSequenciaJogador(4);
    });
});
function validarSequenciaJogador(jogada) {
    if (!vezJogador)
        return;
    sequenciaJogador.push(jogada);
    const posicaoAtual = sequenciaJogador.length === 0 ? 0 : sequenciaJogador.length - 1;
    if (sequenciaMaquina[posicaoAtual] !== sequenciaJogador[posicaoAtual]) {
        vezJogador = false;
        habilitarBotoes([botaoBaixo, botaoDireita, botaoEsquerda, botaoTopo], vezJogador);
        qtdAcertos = sequenciaMaquina.length - 1 || 0;
        localStorage.setItem('ultimaPontuacao', qtdAcertos.toString());
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
        atualizaRankingJogador(jogadorAtual, qtdAcertos);
        return;
    }
    for (let contador = 0; contador < sequenciaMaquina.length; contador++) {
        if (sequenciaMaquina.length === sequenciaJogador.length &&
            sequenciaMaquina[contador] === sequenciaJogador[contador]) {
            qtdAcertos++;
            addPontuacaoAtual(pontuacaoAtual, qtdAcertos);
            vezJogador = false;
            habilitarBotoes([botaoBaixo, botaoDireita, botaoEsquerda, botaoTopo], vezJogador);
            sequenciaJogador = [];
            paragrafoAvisoInicioJogo.innerText = 'Parabéns você acertou!.';
            setTimeout(() => {
                paragrafoAvisoInicioJogo.innerText = 'Faça a nova sequência.';
                setTimeout(() => {
                    jogadaMaquina();
                }, 2000);
            }, 2000);
        }
    }
}
function jogadaMaquina() {
    return __awaiter(this, void 0, void 0, function* () {
        sequenciaMaquina.push(geradorDeNumeroAleatorio(maximoDeNumerosAleatorio));
        for (const numero of sequenciaMaquina) {
            switch (numero) {
                case 1:
                    yield funcaoPiscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, dificuldadeSelecionada);
                    break;
                case 2:
                    yield funcaoPiscarLuz(ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, dificuldadeSelecionada);
                    break;
                case 3:
                    yield funcaoPiscarLuz(ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, dificuldadeSelecionada);
                    break;
                case 4:
                    yield funcaoPiscarLuz(ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, dificuldadeSelecionada);
                    break;
            }
            yield new Promise((resolve) => setTimeout(resolve, 1000));
        }
        vezJogador = true;
        habilitarBotoes([botaoBaixo, botaoDireita, botaoEsquerda, botaoTopo], vezJogador);
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
    let ultimaPontuacao = localStorage.getItem('ultimaPontuacao') || '0';
    ultimosPontos.innerHTML = ultimaPontuacao.toString();
    qtdAcertos = 0;
    addPontuacaoAtual(pontuacaoAtual, qtdAcertos);
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
    let ultimaPontuacao = localStorage.getItem('ultimaPontuacao') || '0';
    ultimosPontos.innerHTML = ultimaPontuacao.toString();
    qtdAcertos = 0;
    addPontuacaoAtual(pontuacaoAtual, qtdAcertos);
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
});
// jogadaMaquina();
//# sourceMappingURL=script.js.map