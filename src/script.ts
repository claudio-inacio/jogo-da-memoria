import { habilitarBotoes } from './funcoes-utilitarias/habilitar-botoes/habilitarBotoes.js';
import { geradorDeNumeroAleatorio } from './funcoes-utilitarias/numeros-aleatorios/geradorDeNumeroAleatorio.js';
import { funcaoPiscarLuz } from './funcoes-utilitarias/piscar-luz/funcaoPiscarLuz.js';
import { addPontuacaoAtual } from './funcoes-utilitarias/pontuacao-atual/addPontuacaoAtual.js';
import { atualizaRankingJogador, exibirRanking, obterRanking } from './funcoes-utilitarias/valida-ranking/verificaPosicaoNoRanking.js';
// import { verificaPosicaoNoRanking } from './funcoes-utilitarias/valida-ranking/verificaPosicaoNoRanking.js';
import {
  ascenderLuzTrianguloCima,
  apagarLuzTrianguloCima,
  ascenderLuzTrianguloBaixo,
  apagarLuzTrianguloBaixo,
  ascenderLuzTrianguloEsquerda,
  apagarLuzTrianguloEsquerda,
  ascenderLuzTrianguloDireita,
  apagarLuzTrianguloDireita,
} from './luzes.js';
let vezJogador = false;
let qtdAcertos = 0;
let sequenciaMaquina: number[] = [];
let sequenciaJogador: number[] = [];
let jogadorAtual = '';
const maximoDeNumerosAleatorio = 4;
const tempoLuzAcesa = {
  CLIQUE_JOGADOR: 500,
  FACIL: 1000,
  MEDIO: 500,
  DIFICIL: 300,
};
let dificuldadeSelecionada = tempoLuzAcesa.FACIL;
const modal = document.getElementById('modal') as HTMLDivElement;
const menuStart = document.getElementById('menu-redondo') as HTMLDivElement;
const rankingInicial = obterRanking()
const botaoAbrirModalInicioPartida = document.getElementById(
  'botao-comecar-jogo'
) as HTMLButtonElement;
const botaoReabrirModalInicioPartida = document.getElementById(
  'botao-novo-jogador'
) as HTMLButtonElement;
const botaoNovaTentativa = document.getElementById(
  'botao-tentar-novamente'
) as HTMLButtonElement;
const containerReiniciarJogo = document.getElementById(
  'container-reset-jogo'
) as HTMLButtonElement;
const botaoFecharModal = document.getElementById(
  'fechar-modal'
) as HTMLButtonElement;
const formInicioJogo = document.getElementById(
  'form-inicio-jogo'
) as HTMLFormElement;
const botaoTopo = document.getElementById('botao-cima') as HTMLButtonElement;
const botaoBaixo = document.getElementById('botao-baixo') as HTMLButtonElement;
const botaoEsquerda = document.getElementById(
  'botao-esquerda'
) as HTMLButtonElement;
const botaoDireita = document.getElementById(
  'botao-direita'
) as HTMLButtonElement;
const pontuacaoAtual = document.getElementById(
  'pontos-atuais'
) as HTMLParagraphElement;
const ultimosPontos = document.getElementById(
  'ultimos-pontos'
) as HTMLParagraphElement;
let ultimaPontuacao = localStorage.getItem('ultimaPontuacao') || '0';


document.addEventListener('DOMContentLoaded', () => {
  exibirRanking(rankingInicial);
  ultimosPontos.innerHTML = ultimaPontuacao.toString();
  botaoTopo?.addEventListener('click', () => {
    funcaoPiscarLuz(
      ascenderLuzTrianguloCima,
      apagarLuzTrianguloCima,
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    validarSequenciaJogador(1);
  });
  botaoBaixo?.addEventListener('click', () => {
    funcaoPiscarLuz(
      ascenderLuzTrianguloBaixo,
      apagarLuzTrianguloBaixo,
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    validarSequenciaJogador(2);
  });
  botaoEsquerda?.addEventListener('click', () => {
    funcaoPiscarLuz(
      ascenderLuzTrianguloEsquerda,
      apagarLuzTrianguloEsquerda,
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    validarSequenciaJogador(3);
  });
  botaoDireita?.addEventListener('click', () => {
    funcaoPiscarLuz(
      ascenderLuzTrianguloDireita,
      apagarLuzTrianguloDireita,
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    validarSequenciaJogador(4);
  });
});


function validarSequenciaJogador(jogada: number): void {
  if (!vezJogador) return;
  sequenciaJogador.push(jogada);
  const posicaoAtual =
    sequenciaJogador.length === 0 ? 0 : sequenciaJogador.length - 1;
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
    if (
      sequenciaMaquina.length === sequenciaJogador.length &&
      sequenciaMaquina[contador] === sequenciaJogador[contador]
    ) {
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

async function jogadaMaquina(): Promise<void> {
  sequenciaMaquina.push(geradorDeNumeroAleatorio(maximoDeNumerosAleatorio));
  for (const numero of sequenciaMaquina) {
    switch (numero) {
      case 1:
        await funcaoPiscarLuz(
          ascenderLuzTrianguloCima,
          apagarLuzTrianguloCima,
          dificuldadeSelecionada
        );
        break;
      case 2:
        await funcaoPiscarLuz(
          ascenderLuzTrianguloBaixo,
          apagarLuzTrianguloBaixo,
          dificuldadeSelecionada
        );
        break;
      case 3:
        await funcaoPiscarLuz(
          ascenderLuzTrianguloEsquerda,
          apagarLuzTrianguloEsquerda,
          dificuldadeSelecionada
        );
        break;
      case 4:
        await funcaoPiscarLuz(
          ascenderLuzTrianguloDireita,
          apagarLuzTrianguloDireita,
          dificuldadeSelecionada
        );
        break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  vezJogador = true;
  habilitarBotoes([botaoBaixo, botaoDireita, botaoEsquerda, botaoTopo], vezJogador);
  paragrafoAvisoInicioJogo.innerText = 'Sua vez!';
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
    [tempoLuzAcesa.FACIL]:
      'Fique tranquilo, as luzes vão ascender lentamente...',
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
  const nome = (document.getElementById('nome') as HTMLInputElement).value;
  const dificuldade = (
    document.getElementById('dificuldade') as HTMLSelectElement
  ).value;

  if (dificuldade === 'FACIL') {
    dificuldadeSelecionada = tempoLuzAcesa.FACIL;
  } else if (dificuldade === 'MEDIO') {
    dificuldadeSelecionada = tempoLuzAcesa.MEDIO;
  } else {
    dificuldadeSelecionada = tempoLuzAcesa.DIFICIL;
  }
  jogadorAtual = nome;

  containerReiniciarJogo.classList.add('display');
  modal.classList.add('hidden');

  avisoInicioPartida();
});

// jogadaMaquina();
