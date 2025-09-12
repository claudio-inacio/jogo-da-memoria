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

