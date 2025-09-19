var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { habilitarBotoes, habilitarTodosBotoes, } from './funcoes-utilitarias/habilitar-botoes/habilitarBotoes.js';
import { geradorDeNumeroAleatorio } from './funcoes-utilitarias/numeros-aleatorios/geradorDeNumeroAleatorio.js';
import { funcaoPiscarLuz } from './funcoes-utilitarias/piscar-luz/funcaoPiscarLuz.js';
import { addPontuacaoAtual } from './funcoes-utilitarias/pontuacao-atual/addPontuacaoAtual.js';
import { atualizaRankingJogador, exibirRanking, obterRanking, } from './funcoes-utilitarias/controle-ranking/useControleDeRanking.js';
import { controladorLuzes,
// apagarLuzTrianguloCima,
// ascenderLuzTrianguloBaixo,
// apagarLuzTrianguloBaixo,
// ascenderLuzTrianguloEsquerda,
// apagarLuzTrianguloEsquerda,
// ascenderLuzTrianguloDireita,
// apagarLuzTrianguloDireita,
 } from './luzes.js';
import { atualizaQtdAcertos, obterQtdAcertos, validadorDeJogada, } from './funcoes-utilitarias/validador-jogada/validarJogada.js';
let vezJogador = false;
// let qtdAcertos = 0;
let sequenciaMaquina = [];
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
const paragrafoAvisoInicioJogo = document.createElement('p');
menuStart.append(paragrafoAvisoInicioJogo);
const handleResetArrayMaquina = () => {
    sequenciaMaquina = [];
};
document.addEventListener('DOMContentLoaded', () => {
    exibirRanking(rankingInicial);
    const result = obterQtdAcertos();
    ultimosPontos.innerHTML = ultimaPontuacao.toString();
    botaoTopo === null || botaoTopo === void 0 ? void 0 : botaoTopo.addEventListener('click', () => {
        funcaoPiscarLuz(() => controladorLuzes({ posicao: 'cima', estado: 'aceso' }), () => controladorLuzes({ posicao: 'cima', estado: 'apagado' }), tempoLuzAcesa.CLIQUE_JOGADOR);
        prepararDadosParavalidarJogada(1);
    });
    botaoBaixo === null || botaoBaixo === void 0 ? void 0 : botaoBaixo.addEventListener('click', () => {
        funcaoPiscarLuz(() => controladorLuzes({ posicao: 'baixo', estado: 'aceso' }), () => controladorLuzes({ posicao: 'baixo', estado: 'apagado' }), tempoLuzAcesa.CLIQUE_JOGADOR);
        prepararDadosParavalidarJogada(2);
    });
    botaoEsquerda === null || botaoEsquerda === void 0 ? void 0 : botaoEsquerda.addEventListener('click', () => {
        funcaoPiscarLuz(() => controladorLuzes({ posicao: 'esquerda', estado: 'aceso' }), () => controladorLuzes({ posicao: 'esquerda', estado: 'apagado' }), tempoLuzAcesa.CLIQUE_JOGADOR);
        prepararDadosParavalidarJogada(3);
    });
    botaoDireita === null || botaoDireita === void 0 ? void 0 : botaoDireita.addEventListener('click', () => {
        funcaoPiscarLuz(() => controladorLuzes({ posicao: 'direita', estado: 'aceso' }), () => controladorLuzes({ posicao: 'direita', estado: 'apagado' }), tempoLuzAcesa.CLIQUE_JOGADOR);
        prepararDadosParavalidarJogada(4);
    });
});
function jogadaMaquina() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({ sequenciaMaquina });
        sequenciaMaquina.push(geradorDeNumeroAleatorio(maximoDeNumerosAleatorio));
        for (const numero of sequenciaMaquina) {
            switch (numero) {
                case 1:
                    yield funcaoPiscarLuz(() => controladorLuzes({ posicao: 'cima', estado: 'aceso' }), () => controladorLuzes({ posicao: 'cima', estado: 'apagado' }), dificuldadeSelecionada);
                    break;
                case 2:
                    yield funcaoPiscarLuz(() => controladorLuzes({ posicao: 'baixo', estado: 'aceso' }), () => controladorLuzes({ posicao: 'baixo', estado: 'apagado' }), dificuldadeSelecionada);
                    break;
                case 3:
                    yield funcaoPiscarLuz(() => controladorLuzes({ posicao: 'esquerda', estado: 'aceso' }), () => controladorLuzes({ posicao: 'esquerda', estado: 'apagado' }), dificuldadeSelecionada);
                    break;
                case 4:
                    yield funcaoPiscarLuz(() => controladorLuzes({ posicao: 'direita', estado: 'aceso' }), () => controladorLuzes({ posicao: 'direita', estado: 'apagado' }), dificuldadeSelecionada);
                    break;
            }
            yield new Promise((resolve) => setTimeout(resolve, 1000));
        }
        vezJogador = true;
        habilitarTodosBotoes(vezJogador);
        paragrafoAvisoInicioJogo.innerText = 'Sua vez!';
    });
}
const prepararDadosParavalidarJogada = (jogada) => {
    validadorDeJogada({
        jogada: jogada,
        vezJogador,
        sequenciaMaquina,
        paragrafoAvisoInicioJogo,
        handleResetArrayMaquina,
        jogadorAtual,
        jogadaMaquina,
    });
};
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
function avisoReinicioPartida() {
    let ultimaPontuacao = localStorage.getItem('ultimaPontuacao') || '0';
    ultimosPontos.innerHTML = ultimaPontuacao.toString();
    atualizaQtdAcertos(0);
    addPontuacaoAtual(pontuacaoAtual, 0);
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
    atualizaQtdAcertos(0);
    addPontuacaoAtual(pontuacaoAtual, 0);
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
//# sourceMappingURL=script.js.map