export const funcaoPiscarLuz = (
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