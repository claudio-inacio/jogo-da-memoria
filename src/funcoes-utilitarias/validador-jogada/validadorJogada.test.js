import { __test__ } from './validarJogada';


describe('tratativaDeDerrota', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <button id="botao-cima"></button>
      <button id="botao-baixo"></button>
      <button id="botao-esquerda"></button>
      <button id="botao-direita"></button>
      <div id="container-reiniciar-jogo" class="display"></div>
    `;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('exibe mensagem de derrota e atualiza DOM', () => {
    const paragrafo = document.createElement('p');
    const handleResetArrayMaquina = jest.fn();

    (global).atualizaQtdAcertos = jest.fn();
    (global ).atualizaRankingJogador = jest.fn();

    __test__.tratativaDeDerrota({
      vezJogador: true,
      sequenciaMaquina: [1, 2, 3],
      jogadorAtual: 'Claudio',
      handleResetArrayMaquina,
      paragrafoAvisoInicioJogo: paragrafo,
    });

    expect(paragrafo.innerText).toContain('Você Perdeu :(');
    expect(handleResetArrayMaquina).toHaveBeenCalled();

    jest.runAllTimers();
    expect(paragrafo.innerText).toBe('');
  });
});