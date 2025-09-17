
export function habilitarBotoes(buttons: HTMLButtonElement[], isEnabled: boolean) {
    buttons.forEach(button => {
        button.disabled = !isEnabled;
    });
}