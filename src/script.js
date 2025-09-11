import { ascenderLuzTrianguloCima, apagarLuzTrianguloCima, ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, } from './luzes.js';
import { numeroAleatorio, piscarLuz } from './utils.js';
let jogoIniciado = true;
let sequenciaMaquina = [1, 1, 1, 1];
const maximoDeNumerosAleatorio = 4;
const tempoLuzAcesa = {
    CLIQUE_JOGADOR: 500,
    FACIL: 3000,
    MEDIO: 400,
    DIFICIL: 300,
};
let dificuldadeSelecionada = tempoLuzAcesa.FACIL;
document.addEventListener('DOMContentLoaded', () => {
    const botaoTopo = document.getElementById('botao-cima');
    const botaoBaixo = document.getElementById('botao-baixo');
    const botaoEsquerda = document.getElementById('botao-esquerda');
    const botaoDireita = document.getElementById('botao-direita');
    botaoTopo === null || botaoTopo === void 0 ? void 0 : botaoTopo.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, tempoLuzAcesa.CLIQUE_JOGADOR));
    botaoBaixo === null || botaoBaixo === void 0 ? void 0 : botaoBaixo.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, tempoLuzAcesa.CLIQUE_JOGADOR));
    botaoEsquerda === null || botaoEsquerda === void 0 ? void 0 : botaoEsquerda.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, tempoLuzAcesa.CLIQUE_JOGADOR));
    botaoDireita === null || botaoDireita === void 0 ? void 0 : botaoDireita.addEventListener('click', () => piscarLuz(ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, tempoLuzAcesa.CLIQUE_JOGADOR));
});
// let sequenciaMaquina: number[] = [1, 1, 1, 1];
function jogadaMaquina() {
    // sequenciaMaquina.push(numeroAleatorio(maximoDeNumerosAleatorio));
    for (let counter = 0; counter < sequenciaMaquina.length; counter++) {
        // setTimeout( () => {
        if (sequenciaMaquina[counter] === 1) {
            setTimeout(() => {
                piscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, tempoLuzAcesa.FACIL);
            }, 600 * counter + 200);
        }
        // }, 1000);
    }
}
jogadaMaquina();
//# sourceMappingURL=script.js.map