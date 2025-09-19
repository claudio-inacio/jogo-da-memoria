import {expect, jest, test} from '@jest/globals';
import {funcaoPiscarLuz} from './funcaoPiscarLuz.js';

describe('piscarLuz', () => {
    //quando vamos trabalhar com setTimeout ou setInterval precisamos usar o jest.useFakeTimers()
    beforeEach(() => {
        jest.useFakeTimers(); 
    })
    afterEach(() => {
        jest.useRealTimers();
    })

    test('deve ascender imediatamente e apagar após o tempo definido', () => {
        const ascenderMock = jest.fn();
        const apagarMock = jest.fn();

        const tempoLuzAcesa = 200;
        funcaoPiscarLuz(ascenderMock, apagarMock, tempoLuzAcesa);

        expect(ascenderMock).toHaveBeenCalledTimes(1);
        expect(apagarMock).not.toHaveBeenCalled();

        jest.advanceTimersByTime(tempoLuzAcesa)

        expect(apagarMock).toHaveBeenCalledTimes(1);

    })
});