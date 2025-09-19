import { habilitarTodosBotoes } from '../habilitar-botoes/habilitarBotoes.js';
// import { addPontuacaoAtual } from '../pontuacao-atual/addPontuacaoAtual.js';
import { atualizaRankingJogador } from '../controle-ranking/useControleDeRanking.js';
import { addPontuacaoAtual } from '../pontuacao-atual/addPontuacaoAtual.js';

interface PropsValidacaoJogada {
  jogada: number;
  vezJogador: boolean;
  handleResetArrayMaquina: () => void;
  sequenciaMaquina: number[];
  jogadorAtual: string;
  paragrafoAvisoInicioJogo: HTMLElement;
  jogadaMaquina: () => void;
}
interface PropsTratativaDerrota
  extends Pick<
    PropsValidacaoJogada,
    | 'vezJogador'
    | 'handleResetArrayMaquina'
    | 'sequenciaMaquina'
    | 'jogadorAtual'
    | 'paragrafoAvisoInicioJogo'
  > {}
interface PropsTratatovaAcerto
  extends Pick<
    PropsValidacaoJogada,
    | 'vezJogador'
    | 'jogadaMaquina'
    | 'sequenciaMaquina'
    | 'paragrafoAvisoInicioJogo'
  > {}

let sequenciaJogador: number[] = [];
let qtdAcertos: number = 0;

const pontuacaoAtual = document.getElementById(
  'pontos-atuais'
) as HTMLParagraphElement;

export function atualizaQtdAcertos(qtd: number) {
  qtdAcertos = qtd;
}
export function obterQtdAcertos() {
  return qtdAcertos;
}

function tratativaDeDerrota({
  vezJogador,
  sequenciaMaquina,
  jogadorAtual,
  handleResetArrayMaquina,
  paragrafoAvisoInicioJogo,
}: PropsTratativaDerrota) {
  const containerReiniciarJogo = document.getElementById(
    'container-reset-jogo'
  ) as HTMLButtonElement;

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

function tratativaAcerto({
  vezJogador,
  sequenciaMaquina,
  jogadaMaquina,
  paragrafoAvisoInicioJogo,
}: PropsTratatovaAcerto) {
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

export function validadorDeJogada({
  vezJogador,
  jogada,
  sequenciaMaquina,
  handleResetArrayMaquina,
  jogadorAtual,
  paragrafoAvisoInicioJogo,
  jogadaMaquina,
}: PropsValidacaoJogada): void {
  if (!vezJogador) return;
  sequenciaJogador.push(jogada);
  const posicaoAtual =
    sequenciaJogador.length === 0 ? 0 : sequenciaJogador.length - 1;

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
