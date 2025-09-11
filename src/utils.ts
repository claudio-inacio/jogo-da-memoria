export function numeroAleatorio(max: number) {
  return Math.floor(Math.random() * max + 1);
}

export const piscarLuz = (
  ascender: () => void,
  apagar: () => void,
  tempoAceso: number
) => {
  console.log('piscar');
  const button = document.querySelector('.triangulo-cima') as HTMLElement;
//   button.classList.remove('triangulo-cima-aceso');
//   void button.offsetWidth;
  ascender();
  setTimeout(() => {
    apagar();
  }, tempoAceso);
};
