export function controladorLuzes({ posicao, estado }) {
    const botaoAtual = document.getElementById(`botao-${posicao}`);
    if (!botaoAtual)
        return;
    botaoAtual.classList.remove(`triangulo-${posicao}-aceso`);
    botaoAtual.classList.remove(`triangulo-${posicao}-apagado`);
    botaoAtual.classList.add(`triangulo-${posicao}-${estado}`);
}
//# sourceMappingURL=luzes.js.map