type ManipulacaoTriangulo = {
  posicao: 'cima' | 'baixo' | 'esquerda' | 'direita';
  estado: 'aceso' | 'apagado';
};
export function controladorLuzes({ posicao, estado }: ManipulacaoTriangulo): void {
  const botaoAtual = document.getElementById(`botao-${posicao}`);
  if (!botaoAtual) return;

  botaoAtual.classList.remove(`triangulo-${posicao}-aceso`);
  botaoAtual.classList.remove(`triangulo-${posicao}-apagado`);
  botaoAtual.classList.add(`triangulo-${posicao}-${estado}`);
}
