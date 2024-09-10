import { RecintosZoo } from "./recintos-zoo.js";
import { Animal } from "./componentes/animal.js";
import { CalculaConforto } from "./componentes/calcula-conforto.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Hipopótamos podem conviver no bioma savana e rio', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toBeTruthy(); // Verifica se encontrou recintos viáveis
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 4 total: 8)'); // Verifique o recinto correto retornado
    });


    test('Deve criar um objeto Animal corretamente', () => {
        const animal = new Animal('MACACO', 1, ['savana', 'floresta']);
        expect(animal.especie).toBe('MACACO');
        expect(animal.tamanho).toBe(1);
        expect(animal.biomas).toEqual(['savana', 'floresta']);
    });

    test('Deve verificar regras de conforto para o HIPOPOTAMO', () => {
        const zoo = new RecintosZoo();
        const recinto = { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'HIPOPOTAMO', quantidade: 2 }] };
        const resultado = CalculaConforto.verificaConforto(recinto, 'HIPOPOTAMO', zoo.animaisPermitidos);
        expect(resultado).toBe(true);
    });
    
    
    test('Deve retornar erro quando nenhum recinto é viável', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 10); // Uma quantidade maior que qualquer espaço disponível
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar recinto com predadores para macacos', () => {
        const recinto = {
            numero: 1,
            bioma: 'floresta',
            tamanhoTotal: 10,
            animais: [{ especie: 'LEAO', quantidade: 1 }]
        };
        const resultado = CalculaConforto.verificaConforto(recinto, 'MACACO', {});
        expect(resultado).toBe(false); // Deve retornar falso já que há um predador (LEAO)
    });
    
    test('Deve aceitar recinto sem predadores para macacos', () => {
        const recinto = {
            numero: 2,
            bioma: 'floresta',
            tamanhoTotal: 10,
            animais: [{ especie: 'GAZELA', quantidade: 1 }]
        };
        const resultado = CalculaConforto.verificaConforto(recinto, 'MACACO', {});
        expect(resultado).toBe(true); // Deve retornar verdadeiro já que não há predadores
    });
    
    test('Deve rejeitar recinto com leopardo para macacos', () => {
        const recinto = {
            numero: 3,
            bioma: 'floresta',
            tamanhoTotal: 8,
            animais: [{ especie: 'LEOPARDO', quantidade: 1 }]
        };
        const resultado = CalculaConforto.verificaConforto(recinto, 'MACACO', {});
        expect(resultado).toBe(false); // Deve retornar falso, já que há um LEOPARDO
    });
    
    test('Deve aceitar recinto sem predadores para macacos (nenhum animal)', () => {
        const recinto = {
            numero: 4,
            bioma: 'floresta',
            tamanhoTotal: 8,
            animais: []
        };
        const resultado = CalculaConforto.verificaConforto(recinto, 'MACACO', {});
        expect(resultado).toBe(true); // Deve retornar verdadeiro, pois não há nenhum animal no recinto
    });
    


});

