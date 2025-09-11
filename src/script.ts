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

let jogoIniciado = true;
let sequenciaMaquina: number[] = [];
const maximoDeNumerosAleatorio = 4;
const tempoLuzAcesa = {
  CLIQUE_JOGADOR: 500,
  FACIL: 1000,
  MEDIO: 500,
  DIFICIL: 300,
};
let dificuldadeSelecionada = tempoLuzAcesa.DIFICIL;

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

    // intervalo extra entre piscadas (opcional)
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

// jogadaMaquina();
