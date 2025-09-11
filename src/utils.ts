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
