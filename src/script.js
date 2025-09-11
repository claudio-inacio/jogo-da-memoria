var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ascenderLuzTrianguloCima, apagarLuzTrianguloCima, ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, } from './luzes.js';
import { numeroAleatorio, piscarLuz } from './utils.js';
let jogoIniciado = true;
let sequenciaMaquina = [];
const maximoDeNumerosAleatorio = 4;
const tempoLuzAcesa = {
    CLIQUE_JOGADOR: 500,
    FACIL: 1000,
    MEDIO: 500,
    DIFICIL: 300,
};
let dificuldadeSelecionada = tempoLuzAcesa.DIFICIL;
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
function jogadaMaquina() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const numero of sequenciaMaquina) {
            switch (numero) {
                case 1:
                    yield piscarLuz(ascenderLuzTrianguloCima, apagarLuzTrianguloCima, dificuldadeSelecionada);
                    break;
                case 2:
                    yield piscarLuz(ascenderLuzTrianguloBaixo, apagarLuzTrianguloBaixo, dificuldadeSelecionada);
                    break;
                case 3:
                    yield piscarLuz(ascenderLuzTrianguloEsquerda, apagarLuzTrianguloEsquerda, dificuldadeSelecionada);
                    break;
                case 4:
                    yield piscarLuz(ascenderLuzTrianguloDireita, apagarLuzTrianguloDireita, dificuldadeSelecionada);
                    break;
            }
            // intervalo extra entre piscadas (opcional)
            yield new Promise((resolve) => setTimeout(resolve, 200));
        }
    });
}
// jogadaMaquina();
//# sourceMappingURL=script.js.map