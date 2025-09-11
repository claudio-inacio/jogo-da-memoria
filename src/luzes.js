function controladorLuzes(posicao, estado) {
    const botaoAtual = document.getElementById(`botao-${posicao}`);
    if (!botaoAtual)
        return;
    botaoAtual.classList.remove(`triangulo-${posicao}-aceso`);
    botaoAtual.classList.remove(`triangulo-${posicao}-apagado`);
    botaoAtual.classList.add(`triangulo-${posicao}-${estado}`);
}
export function ascenderLuzTrianguloCima() {
    controladorLuzes('cima', 'aceso');
}
export function apagarLuzTrianguloCima() {
    controladorLuzes('cima', 'apagado');
}
export function ascenderLuzTrianguloBaixo() {
    controladorLuzes('baixo', 'aceso');
}
export function apagarLuzTrianguloBaixo() {
    controladorLuzes('baixo', 'apagado');
}
export function ascenderLuzTrianguloEsquerda() {
    controladorLuzes('esquerda', 'aceso');
}
export function apagarLuzTrianguloEsquerda() {
    controladorLuzes('esquerda', 'apagado');
}
export function ascenderLuzTrianguloDireita() {
    controladorLuzes('direita', 'aceso');
}
export function apagarLuzTrianguloDireita() {
    controladorLuzes('direita', 'apagado');
}
//# sourceMappingURL=luzes.js.map