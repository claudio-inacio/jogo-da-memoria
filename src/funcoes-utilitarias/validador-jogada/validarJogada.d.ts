interface PropsValidacaoJogada {
    jogada: number;
    vezJogador: boolean;
    handleResetArrayMaquina: () => void;
    sequenciaMaquina: number[];
    jogadorAtual: string;
    paragrafoAvisoInicioJogo: HTMLElement;
    jogadaMaquina: () => void;
}
interface PropsTratativaDerrota extends Pick<PropsValidacaoJogada, 'vezJogador' | 'handleResetArrayMaquina' | 'sequenciaMaquina' | 'jogadorAtual' | 'paragrafoAvisoInicioJogo'> {
}
interface PropsTratatovaAcerto extends Pick<PropsValidacaoJogada, 'vezJogador' | 'jogadaMaquina' | 'sequenciaMaquina' | 'paragrafoAvisoInicioJogo'> {
}
export declare function atualizaQtdAcertos(qtd: number): void;
export declare function obterQtdAcertos(): number;
declare function tratativaDeDerrota({ vezJogador, sequenciaMaquina, jogadorAtual, handleResetArrayMaquina, paragrafoAvisoInicioJogo, }: PropsTratativaDerrota): void;
declare function tratativaAcerto({ vezJogador, sequenciaMaquina, jogadaMaquina, paragrafoAvisoInicioJogo, }: PropsTratatovaAcerto): void;
export declare function validadorDeJogada({ vezJogador, jogada, sequenciaMaquina, handleResetArrayMaquina, jogadorAtual, paragrafoAvisoInicioJogo, jogadaMaquina, }: PropsValidacaoJogada): void;
export declare const __test__: {
    tratativaDeDerrota: typeof tratativaDeDerrota;
    tratativaAcerto: typeof tratativaAcerto;
};
export {};
//# sourceMappingURL=validarJogada.d.ts.map