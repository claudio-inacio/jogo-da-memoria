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
import { numeroAleatorio, piscarLuz } from './utils.js';
let jogoIniciado = false;
let sequenciaMaquina = [3, 1, 4, 2];
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
const botaoIniciarPartida = document.getElementById('iniciar-partida');
const botaoFecharModal = document.getElementById('fechar-modal');
const formInicioJogo = document.getElementById('form-inicio-jogo');
document.addEventListener('DOMContentLoaded', () => {
    const botaoTopo = document.getElementById('botao-cima');
    const botaoBaixo = document.getElementById('botao-baixo');
    const botaoEsquerda = document.getElementById('botao-esquerda');
    const botaoDireita = document.getElementById('botao-direita');
    botaoTopo === null || botaoTopo === void 0 ? void 0 : botaoTopo.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, tempoLuzAcesa.CLIQUE_JOGADOR));
    botaoBaixo === null || botaoBaixo === void 0 ? void 0 : botaoBaixo.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, tempoLuzAcesa.CLIQUE_JOGADOR));
    botaoEsquerda === null || botaoEsquerda === void 0 ? void 0 : botaoEsquerda.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, tempoLuzAcesa.CLIQUE_JOGADOR));
    botaoDireita === null || botaoDireita === void 0 ? void 0 : botaoDireita.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, tempoLuzAcesa.CLIQUE_JOGADOR));
});
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
            yield new Promise((resolve) => setTimeout(resolve, 200));
        }
        paragrafoAvisoInicioJogo.innerText = "Sua vez!";
    });
}
botaoAbrirModalInicioPartida.addEventListener('click', () => {
    modal.classList.remove('hidden');
});
botaoFecharModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});
const paragrafoAvisoInicioJogo = document.createElement('p');
menuStart.append(paragrafoAvisoInicioJogo);
function avisoInicioPartida() {
    jogoIniciado = true;
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
    paragrafoAvisoInicioJogo.innerText = mensagemDeEscolha[dificuldadeSelecionada] || 'Ótima Escolha !';
    setTimeout(() => {
        paragrafoAvisoInicioJogo.innerText = mensagemDeInicioDefinitivo[dificuldadeSelecionada] || 'A partida vai começar em breve...';
        setTimeout(() => {
            paragrafoAvisoInicioJogo.innerText = 'Observe atentamente a sequencia';
            setTimeout(() => {
                jogadaMaquina();
            }, 3000);
        }, 4000);
    }, 5000);
}
formInicioJogo.addEventListener('submit', (event) => {
    event.preventDefault();
    jogoIniciado = true;
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
    modal.classList.add('hidden');
    avisoInicioPartida();
    console.log({ jogadorAtual });
    console.log({ dificuldadeSelecionada });
});
// jogadaMaquina();
//# sourceMappingURL=script.js.map