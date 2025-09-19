import {
  habilitarBotoes,
  habilitarTodosBotoes,
} from './funcoes-utilitarias/habilitar-botoes/habilitarBotoes.js';
import { geradorDeNumeroAleatorio } from './funcoes-utilitarias/numeros-aleatorios/geradorDeNumeroAleatorio.js';
import { funcaoPiscarLuz } from './funcoes-utilitarias/piscar-luz/funcaoPiscarLuz.js';
import { addPontuacaoAtual } from './funcoes-utilitarias/pontuacao-atual/addPontuacaoAtual.js';

import {
  atualizaRankingJogador,
  exibirRanking,
  obterRanking,
} from './funcoes-utilitarias/controle-ranking/useControleDeRanking.js';
import {
  controladorLuzes,
  // apagarLuzTrianguloCima,
  // ascenderLuzTrianguloBaixo,
  // apagarLuzTrianguloBaixo,
  // ascenderLuzTrianguloEsquerda,
  // apagarLuzTrianguloEsquerda,
  // ascenderLuzTrianguloDireita,
  // apagarLuzTrianguloDireita,
} from './luzes.js';
import {
  atualizaQtdAcertos,
  obterQtdAcertos,
  validadorDeJogada,
} from './funcoes-utilitarias/validador-jogada/validarJogada.js';

let vezJogador = false;

// let qtdAcertos = 0;
let sequenciaMaquina: number[] = [];
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
const rankingInicial = obterRanking();
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
const paragrafoAvisoInicioJogo = document.createElement('p');
menuStart.append(paragrafoAvisoInicioJogo);

const handleResetArrayMaquina = () => {
  sequenciaMaquina = [];
};

document.addEventListener('DOMContentLoaded', () => {
  exibirRanking(rankingInicial);
  const result = obterQtdAcertos();
  ultimosPontos.innerHTML = ultimaPontuacao.toString();
  botaoTopo?.addEventListener('click', () => {
    funcaoPiscarLuz(
      () => controladorLuzes({ posicao: 'cima', estado: 'aceso' }),
      () => controladorLuzes({ posicao: 'cima', estado: 'apagado' }),
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    prepararDadosParavalidarJogada(1);
  });
  botaoBaixo?.addEventListener('click', () => {
    funcaoPiscarLuz(
      () => controladorLuzes({ posicao: 'baixo', estado: 'aceso' }),
      () => controladorLuzes({ posicao: 'baixo', estado: 'apagado' }),
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    prepararDadosParavalidarJogada(2);
  });
  botaoEsquerda?.addEventListener('click', () => {
    funcaoPiscarLuz(
      () => controladorLuzes({ posicao: 'esquerda', estado: 'aceso' }),
      () => controladorLuzes({ posicao: 'esquerda', estado: 'apagado' }),
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    prepararDadosParavalidarJogada(3);
  });
  botaoDireita?.addEventListener('click', () => {
    funcaoPiscarLuz(
      () => controladorLuzes({ posicao: 'direita', estado: 'aceso' }),
      () => controladorLuzes({ posicao: 'direita', estado: 'apagado' }),
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    prepararDadosParavalidarJogada(4);
  });
});

async function jogadaMaquina(): Promise<void> {
  console.log({ sequenciaMaquina });
  sequenciaMaquina.push(geradorDeNumeroAleatorio(maximoDeNumerosAleatorio));
  for (const numero of sequenciaMaquina) {
    switch (numero) {
      case 1:
        await funcaoPiscarLuz(
          () => controladorLuzes({ posicao: 'cima', estado: 'aceso' }),
          () => controladorLuzes({ posicao: 'cima', estado: 'apagado' }),
          dificuldadeSelecionada
        );
        break;
      case 2:
        await funcaoPiscarLuz(
          () => controladorLuzes({ posicao: 'baixo', estado: 'aceso' }),
          () => controladorLuzes({ posicao: 'baixo', estado: 'apagado' }),
          dificuldadeSelecionada
        );
        break;
      case 3:
        await funcaoPiscarLuz(
          () => controladorLuzes({ posicao: 'esquerda', estado: 'aceso' }),
          () => controladorLuzes({ posicao: 'esquerda', estado: 'apagado' }),
          dificuldadeSelecionada
        );
        break;
      case 4:
        await funcaoPiscarLuz(
          () => controladorLuzes({ posicao: 'direita', estado: 'aceso' }),
          () => controladorLuzes({ posicao: 'direita', estado: 'apagado' }),
          dificuldadeSelecionada
        );
        break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  vezJogador = true;
  habilitarTodosBotoes(vezJogador);
  paragrafoAvisoInicioJogo.innerText = 'Sua vez!';
}
const prepararDadosParavalidarJogada = (jogada: number) => {
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
