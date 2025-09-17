import { geradorDeNumeroAleatorio } from './geradorDeNumeroAleatorio.js';

describe('geradorDeNumerosAleatorio.js', () => {
  test('deve gerar um numero aleatorio, que seja menor que o numero maximo informado', () => {
    //toBeLessThanOrEqual é usado para verificar se um valor é menor ou igual a outro valor.
    expect(geradorDeNumeroAleatorio(4)).toBeLessThanOrEqual(4);
  });
});
