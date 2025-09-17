type Jogador = {
    nome: string;
    pontos: number;
};
type Ranking = {
    primeiroLugar: Jogador;
    segundoLugar: Jogador;
    terceiroLugar: Jogador;
};
export declare function obterRanking(): Ranking;
export declare function salvarRanking(ranking: Ranking): void;
export declare function exibirRanking(ranking: Ranking): void;
export declare function atualizaRankingJogador(nomeJogador: string, pontos: number): Ranking;
export {};
//# sourceMappingURL=verificaPosicaoNoRanking.d.ts.map