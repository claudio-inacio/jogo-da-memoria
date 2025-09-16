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
import {
  numeroAleatorio,
  piscarLuz,
  habilitarBotoes,
  addPontuacaoAtual,
  verficarMelhorPontuacao,
} from './utils.js';
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
  ultimosPontos.innerHTML = ultimaPontuacao.toString();
  botaoTopo?.addEventListener('click', () => {
    piscarLuz(
      ascenderLuzTrianguloCima,
      apagarLuzTrianguloCima,
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    validarSequenciaJogador(1);
  });
  botaoBaixo?.addEventListener('click', () => {
    piscarLuz(
      ascenderLuzTrianguloBaixo,
      apagarLuzTrianguloBaixo,
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    validarSequenciaJogador(2);
  });
  botaoEsquerda?.addEventListener('click', () => {
    piscarLuz(
      ascenderLuzTrianguloEsquerda,
      apagarLuzTrianguloEsquerda,
      tempoLuzAcesa.CLIQUE_JOGADOR
    );
    validarSequenciaJogador(3);
  });
  botaoDireita?.addEventListener('click', () => {
    piscarLuz(
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
    habilitarBotoes(vezJogador);
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
    verficarMelhorPontuacao(jogadorAtual, qtdAcertos);
    return;
  }

  for (let contador = 0; contador < sequenciaMaquina.length; contador++) {
    if (
      sequenciaMaquina.length === sequenciaJogador.length &&
      sequenciaMaquina[contador] === sequenciaJogador[contador]
    ) {
      qtdAcertos++;
      addPontuacaoAtual(qtdAcertos);
      vezJogador = false;
      habilitarBotoes(vezJogador);
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
  sequenciaMaquina.push(numeroAleatorio(maximoDeNumerosAleatorio));
  for (const numero of sequenciaMaquina) {
    switch (numero) {
      case 1:
        await piscarLuz(
          ascenderLuzTrianguloCima,
          apagarLuzTrianguloCima,
          dificuldadeSelecionada
        );
        break;
      case 2:
        await piscarLuz(
          ascenderLuzTrianguloBaixo,
          apagarLuzTrianguloBaixo,
          dificuldadeSelecionada
        );
        break;
      case 3:
        await piscarLuz(
          ascenderLuzTrianguloEsquerda,
          apagarLuzTrianguloEsquerda,
          dificuldadeSelecionada
        );
        break;
      case 4:
        await piscarLuz(
          ascenderLuzTrianguloDireita,
          apagarLuzTrianguloDireita,
          dificuldadeSelecionada
        );
        break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  vezJogador = true;
  habilitarBotoes(vezJogador);
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
  addPontuacaoAtual(qtdAcertos);
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
  addPontuacaoAtual(qtdAcertos);

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
  // sequenciaMaquina.push(numeroAleatorio(maximoDeNumerosAleatorio));
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
