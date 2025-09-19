interface PropsValidacaoJogada {
    jogada: number;
    vezJogador: boolean;
    handleResetArrayMaquina: () => void;
    sequenciaMaquina: number[];
    jogadorAtual: string;
    paragrafoAvisoInicioJogo: HTMLElement;
    jogadaMaquina: () => void;
}
export declare function atualizaQtdAcertos(qtd: number): void;
export declare function obterQtdAcertos(): number;
export declare function validadorDeJogada({ vezJogador, jogada, sequenciaMaquina, handleResetArrayMaquina, jogadorAtual, paragrafoAvisoInicioJogo, jogadaMaquina, }: PropsValidacaoJogada): void;
export {};
//# sourceMappingURL=validarJogada.d.ts.map