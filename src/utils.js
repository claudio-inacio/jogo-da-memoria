export function numeroAleatorio(max) {
    return Math.floor(Math.random() * max + 1);
}
export const piscarLuz = (ascender, apagar, tempoAceso) => {
    console.log('piscar');
    const button = document.querySelector('.triangulo-cima');
    //   button.classList.remove('triangulo-cima-aceso');
    //   void button.offsetWidth;
    ascender();
    setTimeout(() => {
        apagar();
    }, tempoAceso);
};
//# sourceMappingURL=utils.js.map