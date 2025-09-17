type Jogador = { nome: string; pontos: number };
type Ranking = {
  primeiroLugar: Jogador;
  segundoLugar: Jogador;
  terceiroLugar: Jogador;
};

export function obterRanking(): Ranking {
  const rankingLocalStorage = localStorage.getItem('ranking');

  return rankingLocalStorage
    ? JSON.parse(rankingLocalStorage)
    : {
        primeiroLugar: { nome: '----', pontos: 0 },
        segundoLugar: { nome: '----', pontos: 0 },
        terceiroLugar: { nome: '----', pontos: 0 },
      };
}

export function salvarRanking(ranking: Ranking): void {
  localStorage.setItem('ranking', JSON.stringify(ranking));
}

export function exibirRanking(ranking: Ranking): void {
  const posicoesName: (keyof Ranking)[] = [
    'primeiroLugar',
    'segundoLugar',
    'terceiroLugar',
  
  ];
  posicoesName.forEach((posicao, index) => {
    const posicaoNoRanking = index + 1;
    const jogador = ranking[posicao];
    const nomePosicao = document.getElementById(`nome-posicao-${posicaoNoRanking}`)
    const pontosPosicao = document.getElementById(`pontos-posicao-${posicaoNoRanking}`)

    if(nomePosicao && pontosPosicao){
      nomePosicao.innerHTML = `${posicaoNoRanking}° ${jogador.nome.toUpperCase()}`
      pontosPosicao.innerHTML = `${jogador.pontos} pontos`;
    }
  })
}

export function atualizaRankingJogador(nomeJogador: string, pontos: number){
  const ranking = obterRanking();

    if (pontos >= ranking.primeiroLugar.pontos) {
    ranking.terceiroLugar = ranking.segundoLugar;
    ranking.segundoLugar = ranking.primeiroLugar;
    ranking.primeiroLugar = { nome: nomeJogador, pontos };
  } else if (pontos >= ranking.segundoLugar.pontos) {
    ranking.terceiroLugar = ranking.segundoLugar;
    ranking.segundoLugar = { nome: nomeJogador, pontos };
  } else if (pontos >= ranking.terceiroLugar.pontos) {
    ranking.terceiroLugar = { nome: nomeJogador, pontos };
  }

  exibirRanking(ranking);
  salvarRanking(ranking);
}
