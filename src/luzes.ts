
function controladorLuzes(
    posicao: 'cima' | 'baixo' | 'esquerda' | 'direita',
    estado: 'aceso' | 'apagado'
): void {
    const botaoAtual = document.getElementById(`botao-${posicao}`);
    if(!botaoAtual) return ;

    botaoAtual.classList.remove(`triangulo-${posicao}-aceso`);
    botaoAtual.classList.remove(`triangulo-${posicao}-apagado`);
    botaoAtual.classList.add(`triangulo-${posicao}-${estado}`);
}


export function ascenderLuzTrianguloCima(): void {
    controladorLuzes('cima', 'aceso');
}

export function apagarLuzTrianguloCima(): void {    
    controladorLuzes('cima', 'apagado');
}
export function ascenderLuzTrianguloBaixo(): void {        
    controladorLuzes('baixo', 'aceso');
}

export function apagarLuzTrianguloBaixo(): void {
    controladorLuzes('baixo', 'apagado');
}
export function ascenderLuzTrianguloEsquerda(): void {
    controladorLuzes('esquerda', 'aceso');
}

export function apagarLuzTrianguloEsquerda(): void {
    controladorLuzes('esquerda', 'apagado');
}
export function ascenderLuzTrianguloDireita(): void {
    controladorLuzes('direita', 'aceso');
}

export function apagarLuzTrianguloDireita(): void {
    controladorLuzes('direita', 'apagado');
}