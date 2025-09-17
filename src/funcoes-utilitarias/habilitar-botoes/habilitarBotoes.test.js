import { habilitarBotoes } from './habilitarBotoes';

describe('habilitarBotoes', () => {
  //Antes de inicair cada teste precisamos simular os elementos HTML do DOM
  let botoes = [];
  beforeEach(() => {
    botoes = [
      document.createElement('button'),
      document.createElement('button'),
      document.createElement('button'),
      document.createElement('button'),
    ];
  });


  test('desabilita todos os botões quando isEnabled = true', () => {
    habilitarBotoes(botoes, false);

    botoes.forEach((botao) => {
      expect(botao.disabled).toBe(true);
    });
  });

  test('habilita todos os botões quando isEnabled = false', () => {
    habilitarBotoes(botoes, true);

    botoes.forEach((botao) => {
      expect(botao.disabled).toBe(false);
    });
  });
});
