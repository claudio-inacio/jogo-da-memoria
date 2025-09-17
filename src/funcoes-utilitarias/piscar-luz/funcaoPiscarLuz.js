export const funcaoPiscarLuz = (ascender, apagar, tempoAceso) => {
    return new Promise((resolve) => {
        ascender();
        setTimeout(() => {
            apagar();
            resolve();
        }, tempoAceso);
    });
};
//# sourceMappingURL=funcaoPiscarLuz.js.map