// const botaoTopo = document.getElementById('botao-cima') as HTMLButtonElement;
// const botaoBaixo = document.getElementById('botao-baixo') as HTMLButtonElement;
// const botaoEsquerda = document.getElementById(
//   'botao-esquerda'
// ) as HTMLButtonElement;
// const botaoDireita = document.getElementById(
//   'botao-direita'
// ) as HTMLButtonElement;
export function habilitarBotoes(buttons, isEnabled) {
    buttons.forEach((button) => {
        button.disabled = !isEnabled;
    });
}
export function habilitarTodosBotoes(isEnabled) {
    const botaoTopo = document.getElementById('botao-cima');
    const botaoBaixo = document.getElementById('botao-baixo');
    const botaoEsquerda = document.getElementById('botao-esquerda');
    const botaoDireita = document.getElementById('botao-direita');
    botaoTopo.disabled = !isEnabled;
    botaoBaixo.disabled = !isEnabled;
    botaoEsquerda.disabled = !isEnabled;
    botaoDireita.disabled = !isEnabled;
}
//# sourceMappingURL=habilitarBotoes.js.map