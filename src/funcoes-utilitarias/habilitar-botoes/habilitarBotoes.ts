const botaoTopo = document.getElementById('botao-cima') as HTMLButtonElement;
const botaoBaixo = document.getElementById('botao-baixo') as HTMLButtonElement;
const botaoEsquerda = document.getElementById(
  'botao-esquerda'
) as HTMLButtonElement;
const botaoDireita = document.getElementById(
  'botao-direita'
) as HTMLButtonElement;

export function habilitarBotoes(buttons: HTMLButtonElement[], isEnabled: boolean) {
    buttons.forEach(button => {
        button.disabled = !isEnabled;
    });
}
export function habilitarTodosBotoes(isEnabled: boolean) {
    botaoTopo.disabled  = !isEnabled
    botaoBaixo.disabled  = !isEnabled
    botaoEsquerda.disabled  = !isEnabled
    botaoDireita.disabled  = !isEnabled
}