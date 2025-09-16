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
const pontuacaoAtual = document.getElementById(
  'pontos-atuais'
) as HTMLParagraphElement;
const nomePrimeiroLugar = document.getElementById(
  'nome-posicao-1'
) as HTMLElement;
const pontosPrimeiroLugar = document.getElementById(
  'pontos-posicao-1'
) as HTMLElement;
const nomeSegundoLugar = document.getElementById(
  'nome-posicao-2'
) as HTMLElement;
const pontosSegundoLugar = document.getElementById(
  'pontos-posicao-2'
) as HTMLElement;
const nomeTerceiroLugar = document.getElementById(
  'nome-posicao-3'
) as HTMLElement;
const pontosTerceiroLugar = document.getElementById(
  'pontos-posicao-3'
) as HTMLElement;
const rankingLocalStorage = localStorage.getItem('rankingPontuacao');
const ranking = rankingLocalStorage
  ? JSON.parse(rankingLocalStorage)
  : {
      primeiroLugar: { nome: 'SEM PONTUADOR', pontos: 0 },
      segundoLugar: { nome: 'SEM PONTUADOR', pontos: 0 },
      terceiroLugar: { nome: 'SEM PONTUADOR', pontos: 0 },
    };

nomePrimeiroLugar.innerHTML = `1° ${ranking.primeiroLugar.nome.toUpperCase()}`;
pontosPrimeiroLugar.innerHTML = `${ranking.primeiroLugar.pontos} pontos`;
nomeSegundoLugar.innerHTML =  `2° ${ranking.segundoLugar.nome.toUpperCase()}`;
pontosSegundoLugar.innerHTML = `${ranking.segundoLugar.pontos} pontos`;
nomeTerceiroLugar.innerHTML = `3° ${ranking.terceiroLugar.nome.toUpperCase()}`;
pontosTerceiroLugar.innerHTML = `${ranking.terceiroLugar.pontos} pontos`;

export function verficarMelhorPontuacao(nomeJogador: string, pontos: number) {
  const rankingLocalStorage = localStorage.getItem('rankingPontuacao');
  const ranking = rankingLocalStorage
    ? JSON.parse(rankingLocalStorage)
    : {
        primeiroLugar: { nome: 'SEM PONTUADOR', pontos: 0 },
        segundoLugar: { nome: 'SEM PONTUADOR', pontos: 0 },
        terceiroLugar: { nome: 'SEM PONTUADOR', pontos: 0 },
      };

  if (pontos >= ranking.primeiroLugar.pontos) {
    ranking.terceiroLugar = ranking.segundoLugar;
    ranking.segundoLugar = ranking.primeiroLugar;
    ranking.primeiroLugar = { nome: nomeJogador, pontos: pontos };
  } else if (pontos >= ranking.segundoLugar.pontos) {
    ranking.terceiroLugar = ranking.segundoLugar;
    ranking.segundoLugar = { nome: nomeJogador, pontos: pontos };
  } else if (pontos >= ranking.terceiroLugar.pontos) {
    ranking.terceiroLugar = { nome: nomeJogador, pontos: pontos };
  }
  nomePrimeiroLugar.innerHTML = `1° ${ranking.primeiroLugar.nome.toUpperCase()}`;
pontosPrimeiroLugar.innerHTML = `${ranking.primeiroLugar.pontos} pontos`;
nomeSegundoLugar.innerHTML =  `2° ${ranking.segundoLugar.nome.toUpperCase()}`;
pontosSegundoLugar.innerHTML = `${ranking.segundoLugar.pontos} pontos`;
nomeTerceiroLugar.innerHTML = `3° ${ranking.terceiroLugar.nome.toUpperCase()}`;
pontosTerceiroLugar.innerHTML = `${ranking.terceiroLugar.pontos} pontos`;

  localStorage.setItem('rankingPontuacao', JSON.stringify(ranking));
}

export function numeroAleatorio(max: number) {
  return Math.floor(Math.random() * max + 1);
}

export const piscarLuz = (
  ascender: () => void,
  apagar: () => void,
  tempoAceso: number
) => {
  return new Promise<void>((resolve) => {
    ascender();
    setTimeout(() => {
      apagar();
      resolve();
    }, tempoAceso);
  });
};

export function habilitarBotoes(disabled: boolean) {
  botaoTopo.disabled = !disabled;
  botaoBaixo.disabled = !disabled;
  botaoEsquerda.disabled = !disabled;
  botaoDireita.disabled = !disabled;
}

export function addPontuacaoAtual(ptsAtual: number) {
  pontuacaoAtual.innerHTML =  ptsAtual.toString();
}

