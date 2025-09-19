import { habilitarTodosBotoes } from '../habilitar-botoes/habilitarBotoes.js';
// import { addPontuacaoAtual } from '../pontuacao-atual/addPontuacaoAtual.js';
import { atualizaRankingJogador } from '../controle-ranking/useControleDeRanking.js';
import { addPontuacaoAtual } from '../pontuacao-atual/addPontuacaoAtual.js';
let sequenciaJogador = [];
let qtdAcertos = 0;
const pontuacaoAtual = document.getElementById('pontos-atuais');
export function atualizaQtdAcertos(qtd) {
    qtdAcertos = qtd;
}
export function obterQtdAcertos() {
    return qtdAcertos;
}
function tratativaDeDerrota({ vezJogador, sequenciaMaquina, jogadorAtual, handleResetArrayMaquina, paragrafoAvisoInicioJogo, }) {
    const containerReiniciarJogo = document.getElementById('container-reset-jogo');
    vezJogador = false;
    sequenciaJogador = [];
    habilitarTodosBotoes(vezJogador);
    atualizaQtdAcertos(sequenciaMaquina.length - 1 || 0);
    localStorage.setItem('ultimaPontuacao', qtdAcertos.toString());
    handleResetArrayMaquina();
    paragrafoAvisoInicioJogo.innerText = `Você Perdeu :( ${jogadorAtual}, sua pontuação foi: ${qtdAcertos}`;
    setTimeout(() => {
        paragrafoAvisoInicioJogo.innerText =
            'Desanima não! Bora pra mais uma tentativa.';
    }, 5000);
    setTimeout(() => {
        paragrafoAvisoInicioJogo.innerText = '';
        containerReiniciarJogo.classList.remove('display');
    }, 10000);
    atualizaRankingJogador(jogadorAtual, qtdAcertos);
}
function tratativaAcerto({ vezJogador, sequenciaMaquina, jogadaMaquina, paragrafoAvisoInicioJogo, }) {
    atualizaQtdAcertos(sequenciaMaquina.length);
    addPontuacaoAtual(pontuacaoAtual, qtdAcertos);
    vezJogador = false;
    habilitarTodosBotoes(vezJogador);
    sequenciaJogador = [];
    paragrafoAvisoInicioJogo.innerText = 'Parabéns você acertou!.';
    setTimeout(() => {
        paragrafoAvisoInicioJogo.innerText = 'Faça a nova sequência.';
        setTimeout(() => {
            return jogadaMaquina();
        }, 2000);
    }, 2000);
}
export function validadorDeJogada({ vezJogador, jogada, sequenciaMaquina, handleResetArrayMaquina, jogadorAtual, paragrafoAvisoInicioJogo, jogadaMaquina, }) {
    if (!vezJogador)
        return;
    sequenciaJogador.push(jogada);
    const posicaoAtual = sequenciaJogador.length === 0 ? 0 : sequenciaJogador.length - 1;
    if (sequenciaMaquina[posicaoAtual] !== sequenciaJogador[posicaoAtual]) {
        return tratativaDeDerrota({
            jogadorAtual,
            handleResetArrayMaquina,
            vezJogador,
            paragrafoAvisoInicioJogo,
            sequenciaMaquina,
        });
    }
    if (sequenciaMaquina.length === sequenciaJogador.length) {
        return tratativaAcerto({
            vezJogador,
            sequenciaMaquina,
            jogadaMaquina,
            paragrafoAvisoInicioJogo,
        });
    }
}
export const __test__ = { tratativaDeDerrota, tratativaAcerto };
//# sourceMappingURL=validarJogada.js.map