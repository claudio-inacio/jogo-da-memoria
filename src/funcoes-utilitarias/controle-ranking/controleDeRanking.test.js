import { jest, test, expect } from '@jest/globals';
import {
  exibirRanking,
  obterRanking,
  atualizaRankingJogador,
} from './verificaPosicaoNoRanking.js';

describe('obterRanking', () => {
  const initialDataItem = { nome: '----', pontos: 0 };
  const initialRankingData = {
    primeiroLugar: { ...initialDataItem },
    segundoLugar: { ...initialDataItem },
    terceiroLugar: { ...initialDataItem },
  };
  const fakeRanking = {
    primeiroLugar: { nome: 'Claudio', pontos: 50 },
    segundoLugar: { nome: 'Maria', pontos: 40 },
    terceiroLugar: { nome: 'João', pontos: 30 },
  };

  beforeEach(() => {
    const store = {};
    global.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeIitem: (key) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key]);
      },
    };
  });

  afterEach(() => {
    delete global.localStorage;
  });

  test('retornar o ranking padrão iniciao', () => {
    const _obterRanking = jest.spyOn({ obterRanking }, 'obterRanking');
    const response = _obterRanking();
    expect(response).toEqual(initialRankingData);
    expect(_obterRanking).toHaveBeenCalled();
  });

  test('retornar o ranking do localStorage', () => {
    localStorage.setItem('ranking', JSON.stringify(fakeRanking));
    const _obterRanking = jest.spyOn({ obterRanking }, 'obterRanking');
    const response = _obterRanking();
    expect(response).toEqual(fakeRanking);
    expect(_obterRanking).toHaveBeenCalled();
  });
});

describe('exibirRanking', () => {
  const initialDataItem = { nome: '----', pontos: 0 };
  const initialRankingData = {
    primeiroLugar: { ...initialDataItem },
    segundoLugar: { ...initialDataItem },
    terceiroLugar: { ...initialDataItem },
  };
  const fakeRanking = {
    primeiroLugar: { nome: 'Claudio', pontos: 50 },
    segundoLugar: { nome: 'Maria', pontos: 40 },
    terceiroLugar: { nome: 'João', pontos: 30 },
  };
  beforeEach(() => {
    //trabalhando com localStorage no jest
    const store = {};
    global.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key]);
      },
    };
    document.body.innerHTML = `
      <span id="nome-posicao-1"></span>
      <span id="pontos-posicao-1"></span>
      <span id="nome-posicao-2"></span>
      <span id="pontos-posicao-2"></span>
      <span id="nome-posicao-3"></span>
      <span id="pontos-posicao-3"></span>
    `;
  });
  afterEach(() => {
    delete global.localStorage;
    document.body.innerHTM = '';
  });
  test('exibir os dodos iniciais do rankin quando não tiver jogador', () => {
    const rankingPositionName = [
      'primeiroLugar',
      'segundoLugar',
      'terceiroLugar',
    ];
    exibirRanking(initialRankingData);

    rankingPositionName.forEach((ranking, index) => {
      const colocacaoAtual = index + 1;
      expect(
        document.getElementById(`nome-posicao-${colocacaoAtual}`).innerHTML
      ).toBe(`${colocacaoAtual}° ${initialRankingData[ranking].nome.toUpperCase()}`);
      expect(
        document.getElementById(`pontos-posicao-${colocacaoAtual}`).innerHTML
      ).toBe(`${initialRankingData[ranking].pontos} pontos`);
    });
  });
  test('exibir os dodos dos jogadores que fazem parte do ranking', () => {
    localStorage.setItem('ranking', JSON.stringify(fakeRanking));
    const rankingPositionName = [
      'primeiroLugar',
      'segundoLugar',
      'terceiroLugar',
    ];
    exibirRanking(fakeRanking);

    rankingPositionName.forEach((ranking, index) => {
      const colocacaoAtual = index + 1;
      expect(
        document.getElementById(`nome-posicao-${colocacaoAtual}`).innerHTML
      ).toBe(`${colocacaoAtual}° ${fakeRanking[ranking].nome.toUpperCase()}`);
      expect(
        document.getElementById(`pontos-posicao-${colocacaoAtual}`).innerHTML
      ).toBe(`${fakeRanking[ranking].pontos} pontos`);
    });
  });
});

describe('atualizaRankingJogador', () => {
  const fakeRanking = {
    primeiroLugar: { nome: 'Claudio', pontos: 50 },
    segundoLugar: { nome: 'Maria', pontos: 40 },
    terceiroLugar: { nome: 'João', pontos: 30 },
  };
  beforeEach(() => {
    const store = {};
    global.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeIitem: (key) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key]);
      },
    };
    document.body.innerHTML = `
      <span id="nome-posicao-1"></span>
      <span id="pontos-posicao-1"></span>
      <span id="nome-posicao-2"></span>
      <span id="pontos-posicao-2"></span>
      <span id="nome-posicao-3"></span>
      <span id="pontos-posicao-3"></span>
    `;
  });

  afterEach(() => {
    delete global.localStorage;
    document.body.innerHTML = '';
  });

  test('atualiza o ranking inserindo o jogador na primeira posição', () => {
    localStorage.setItem('ranking', JSON.stringify(fakeRanking));
    atualizaRankingJogador('Suzaninha', 88);

    expect(document.getElementById('nome-posicao-1').innerHTML).toBe(
      '1° SUZANINHA'
    );
    expect(document.getElementById('pontos-posicao-1').innerHTML).toBe(
      '88 pontos'
    );
    expect(document.getElementById('nome-posicao-2').innerHTML).toBe(
      '2° CLAUDIO'
    );
    expect(document.getElementById('pontos-posicao-2').innerHTML).toBe(
      '50 pontos'
    );
    expect(document.getElementById('nome-posicao-3').innerHTML).toBe(
      '3° MARIA'
    );
    expect(document.getElementById('pontos-posicao-3').innerHTML).toBe(
      '40 pontos'
    );
  });
  test('atualiza o ranking inserindo o jogador na segunda posição', () => {
    localStorage.setItem('ranking', JSON.stringify(fakeRanking));
    atualizaRankingJogador('SUZANINHA', 44);

    expect(document.getElementById('nome-posicao-1').innerHTML).toBe(
      '1° CLAUDIO'
    );
    expect(document.getElementById('pontos-posicao-1').innerHTML).toBe(
      '50 pontos'
    );
    expect(document.getElementById('nome-posicao-2').innerHTML).toBe(
      '2° SUZANINHA'
    );
    expect(document.getElementById('pontos-posicao-2').innerHTML).toBe(
      '44 pontos'
    );
    expect(document.getElementById('nome-posicao-3').innerHTML).toBe(
      '3° MARIA'
    );
    expect(document.getElementById('pontos-posicao-3').innerHTML).toBe(
      '40 pontos'
    );
  });
  test('atualiza o ranking inserindo o jogador na terceira posição', () => {
    localStorage.setItem('ranking', JSON.stringify(fakeRanking));
    atualizaRankingJogador('SUZANINHA', 37);

    expect(document.getElementById('nome-posicao-1').innerHTML).toBe(
      '1° CLAUDIO'
    );
    expect(document.getElementById('pontos-posicao-1').innerHTML).toBe(
      '50 pontos'
    );
    expect(document.getElementById('nome-posicao-2').innerHTML).toBe(
      '2° MARIA'
    );
    expect(document.getElementById('pontos-posicao-2').innerHTML).toBe(
      '40 pontos'
    );
    expect(document.getElementById('nome-posicao-3').innerHTML).toBe(
      '3° SUZANINHA'
    );
    expect(document.getElementById('pontos-posicao-3').innerHTML).toBe(
      '37 pontos'
    );
  });
  test('não atualiza o ranking pois pontuacao foi abaixo do terceiro', () => {
    localStorage.setItem('ranking', JSON.stringify(fakeRanking));
    atualizaRankingJogador('SUZANINHA', 20);

    expect(document.getElementById('nome-posicao-1').innerHTML).toBe(
      '1° CLAUDIO'
    );
    expect(document.getElementById('pontos-posicao-1').innerHTML).toBe(
      '50 pontos'
    );
    expect(document.getElementById('nome-posicao-2').innerHTML).toBe(
      '2° MARIA'
    );
    expect(document.getElementById('pontos-posicao-2').innerHTML).toBe(
      '40 pontos'
    );
    expect(document.getElementById('nome-posicao-3').innerHTML).toBe('3° JOÃO');
    expect(document.getElementById('pontos-posicao-3').innerHTML).toBe(
      '30 pontos'
    );
  });
});
