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
import { numeroAleatorio, piscarLuz } from './utils.js';

let jogoIniciado = false;
let sequenciaMaquina: number[] = [3,1,4,2];
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
const botaoIniciarPartida = document.getElementById(
  'iniciar-partida'
) as HTMLButtonElement;
const botaoFecharModal = document.getElementById(
  'fechar-modal'
) as HTMLButtonElement;
const formInicioJogo = document.getElementById(
  'form-inicio-jogo'
) as HTMLFormElement;

document.addEventListener('DOMContentLoaded', () => {
  const botaoTopo = document.getElementById('botao-cima') as HTMLButtonElement;
  const botaoBaixo = document.getElementById(
    'botao-baixo'
  ) as HTMLButtonElement;
  const botaoEsquerda = document.getElementById(
    'botao-esquerda'
  ) as HTMLButtonElement;
  const botaoDireita = document.getElementById(
    'botao-direita'
  ) as HTMLButtonElement;

  botaoTopo?.addEventListener('click', () =>
    piscarLuz(
      ascenderLuzTrianguloCima,
      apagarLuzTrianguloCima,
      tempoLuzAcesa.CLIQUE_JOGADOR
    )
  );
  botaoBaixo?.addEventListener('click', () =>
    piscarLuz(
      ascenderLuzTrianguloBaixo,
      apagarLuzTrianguloBaixo,
      tempoLuzAcesa.CLIQUE_JOGADOR
    )
  );
  botaoEsquerda?.addEventListener('click', () =>
    piscarLuz(
      ascenderLuzTrianguloEsquerda,
      apagarLuzTrianguloEsquerda,
      tempoLuzAcesa.CLIQUE_JOGADOR
    )
  );
  botaoDireita?.addEventListener('click', () =>
    piscarLuz(
      ascenderLuzTrianguloDireita,
      apagarLuzTrianguloDireita,
      tempoLuzAcesa.CLIQUE_JOGADOR
    )
  );
});

async function jogadaMaquina(): Promise<void> {
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

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  paragrafoAvisoInicioJogo.innerText = "Sua vez!"
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
  }
  const mensagemDeInicioDefinitivo = {
    [tempoLuzAcesa.FACIL]: 'Fique tranquilo, as luzes vão ascender lentamente...',
    [tempoLuzAcesa.MEDIO]: 'Bora lá, você ja sabe como funciona né...',
    [tempoLuzAcesa.DIFICIL]: 'Nem pisca pra não perder a sequencia em...',
  }
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
  modal.classList.add('hidden');

  avisoInicioPartida();
  console.log({ jogadorAtual });
  console.log({ dificuldadeSelecionada });
});

// jogadaMaquina();
