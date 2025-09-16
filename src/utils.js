const botaoTopo = document.getElementById('botao-cima');
const botaoBaixo = document.getElementById('botao-baixo');
const botaoEsquerda = document.getElementById('botao-esquerda');
const botaoDireita = document.getElementById('botao-direita');
const pontuacaoAtual = document.getElementById('pontos-atuais');
const nomePrimeiroLugar = document.getElementById('nome-posicao-1');
const pontosPrimeiroLugar = document.getElementById('pontos-posicao-1');
const nomeSegundoLugar = document.getElementById('nome-posicao-2');
const pontosSegundoLugar = document.getElementById('pontos-posicao-2');
const nomeTerceiroLugar = document.getElementById('nome-posicao-3');
const pontosTerceiroLugar = document.getElementById('pontos-posicao-3');
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
nomeSegundoLugar.innerHTML = `2° ${ranking.segundoLugar.nome.toUpperCase()}`;
pontosSegundoLugar.innerHTML = `${ranking.segundoLugar.pontos} pontos`;
nomeTerceiroLugar.innerHTML = `3° ${ranking.terceiroLugar.nome.toUpperCase()}`;
pontosTerceiroLugar.innerHTML = `${ranking.terceiroLugar.pontos} pontos`;
export function verficarMelhorPontuacao(nomeJogador, pontos) {
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
    }
    else if (pontos >= ranking.segundoLugar.pontos) {
        ranking.terceiroLugar = ranking.segundoLugar;
        ranking.segundoLugar = { nome: nomeJogador, pontos: pontos };
    }
    else if (pontos >= ranking.terceiroLugar.pontos) {
        ranking.terceiroLugar = { nome: nomeJogador, pontos: pontos };
    }
    nomePrimeiroLugar.innerHTML = `1° ${ranking.primeiroLugar.nome.toUpperCase()}`;
    pontosPrimeiroLugar.innerHTML = `${ranking.primeiroLugar.pontos} pontos`;
    nomeSegundoLugar.innerHTML = `2° ${ranking.segundoLugar.nome.toUpperCase()}`;
    pontosSegundoLugar.innerHTML = `${ranking.segundoLugar.pontos} pontos`;
    nomeTerceiroLugar.innerHTML = `3° ${ranking.terceiroLugar.nome.toUpperCase()}`;
    pontosTerceiroLugar.innerHTML = `${ranking.terceiroLugar.pontos} pontos`;
    localStorage.setItem('rankingPontuacao', JSON.stringify(ranking));
}
export function numeroAleatorio(max) {
    return Math.floor(Math.random() * max + 1);
}
export const piscarLuz = (ascender, apagar, tempoAceso) => {
    return new Promise((resolve) => {
        ascender();
        setTimeout(() => {
            apagar();
            resolve();
        }, tempoAceso);
    });
};
export function habilitarBotoes(disabled) {
    botaoTopo.disabled = !disabled;
    botaoBaixo.disabled = !disabled;
    botaoEsquerda.disabled = !disabled;
    botaoDireita.disabled = !disabled;
}
export function addPontuacaoAtual(ptsAtual) {
    pontuacaoAtual.innerHTML = ptsAtual.toString();
}
//# sourceMappingURL=utils.js.map