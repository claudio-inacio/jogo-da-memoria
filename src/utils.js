const botaoTopo = document.getElementById('botao-cima');
const botaoBaixo = document.getElementById('botao-baixo');
const botaoEsquerda = document.getElementById('botao-esquerda');
const botaoDireita = document.getElementById('botao-direita');
const pontuacaoAtual = document.getElementById('pontos-atuais');
const ultimaPontuacao = document.getElementById('ultimos-pontos');
export function numeroAleatorio(max) {
    return Math.floor(Math.random() * max + 1);
}
export const piscarLuz = (ascender, apagar, tempoAceso) => {
    return new Promise((resolve) => {
        ascender();
        setTimeout(() => {
            apagar();
            resolve();
        }, tempoAceso);
    });
};
export function habilitarBotoes(disabled) {
    botaoTopo.disabled = !disabled;
    botaoBaixo.disabled = !disabled;
    botaoEsquerda.disabled = !disabled;
    botaoDireita.disabled = !disabled;
}
export function addPontuacaoAtual(ptsAtual) {
    pontuacaoAtual.innerHTML = ptsAtual.toString();
}
//# sourceMappingURL=utils.js.map