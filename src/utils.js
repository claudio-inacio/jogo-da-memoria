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


//# sourceMappingURL=utils.js.map