import { jest, test, expect } from '@jest/globals';
import {
  verificaPosicaoNoRanking,
  obterRanking,
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

// GARANTE A EXIBIÇÃO DO RANKING OBTIDO NO TELA
// ATUALIZACAO DO RANKING COM LOGICA DE RANKEAMENTO
// describe('verifcaPosicaoNoRanking', () => {
//     let nomePrimeiroLugar;
//     let pontosPrimeiroLugar;
//     let nomeSegundoLugar;
//     let pontosSegundoLugar;
//     let nomeTerceiroLugar;
//     let pontosTerceiroLugar;
//     beforeEach(() => {
//         //trabalhando com localStorage no jest
//         const store = {};
//         global.localStorage = {
//             getItem: (key) => store[key] || null,
//             setItem: (key, value) => {store[key] = value.toString() },
//             removeIitem: (key) => {delete store[key]},
//             clear: () => {Object.keys(store).forEach(key => delete store[key])}
//         }
//         nomePrimeiroLugar = document.createElement('span');
//         pontosPrimeiroLugar = document.createElement('span');
//         nomeSegundoLugar = document.createElement('span');
//         pontosSegundoLugar = document.createElement('span');
//         nomeTerceiroLugar = document.createElement('span');
//         pontosTerceiroLugar = document.createElement('span');
//         global.nomePrimeiroLugar = nomePrimeiroLugar;
//         global.pontosPrimeiroLugar = pontosPrimeiroLugar;
//         global.nomeSegundoLugar = nomeSegundoLugar;
//         global.pontosSegundoLugar = pontosSegundoLugar;
//         global.nomeTerceiroLugar = nomeTerceiroLugar;
//         global.pontosTerceiroLugar = pontosTerceiroLugar;
//     })
//     afterEach(() => {
//         delete global.localStorage;
//         delete global.nomePrimeiroLugar;
//         delete global.pontosPrimeiroLugar;
//         delete global.nomeSegundoLugar;
//         delete global.pontosSegundoLugar;
//         delete global.nomeTerceiroLugar;
//         delete global.pontosTerceiroLugar;
//     })
//     test('deve inserir o jogador na primeira posição', () => {
//         verificaPosicaoNoRanking('Claudio', 88);
//         expect(nomePrimeiroLugar.innerHTML).toBe('1° CLAUDIO');
//         expect(pontosPrimeiroLugar.innerHTML).toBe('88 pontos')
//     })
// })
//# sourceMappingURL=verificaPosicaoNoRanking.test.js.map
