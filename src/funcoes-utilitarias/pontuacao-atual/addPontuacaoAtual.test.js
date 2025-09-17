import { addPontuacaoAtual } from './addPontuacaoAtual';
describe('addPontuacaoAtual', () => {
    let pontuacaoAtual;

    //Antes de inicair cada teste precisamos simular o elemento HTML do DOM
    beforeEach(() => {
        pontuacaoAtual = document.createElement('p');
        global.pontuacaoAtual = pontuacaoAtual; // cria o elemento globalmente para ser utilizado no teste
    });

    //Após finalizarmos cada teste precisamos limpar o DOM
    afterEach(() => {
        delete global.pontuacaoAtual; // excluir o elmento global que criamos acima
    });

    test('deve atualizar o elemento inserindo a pontuacao atual', () => {
        addPontuacaoAtual(pontuacaoAtual, 30);
        expect(pontuacaoAtual.innerHTML).toBe('30');
    });
});
//# sourceMappingURL=addPontuacaoAtual.test.js.map