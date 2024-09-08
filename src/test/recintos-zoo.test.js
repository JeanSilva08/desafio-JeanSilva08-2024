import { RecintosZoo } from '../classes/recintos-zoo'; // Importação nomeada

describe('Recintos do Zoologico', () => {
    let recintoZoo;

    beforeEach(() => {
        recintoZoo = new RecintosZoo();
    }); 

    test('Jest está configurado corretamente', () => {
        expect(true).toBe(true);
    });

    test('Deve rejeitar animal inválido', () => {
        const resultado = recintoZoo.analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = recintoZoo.analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = recintoZoo.analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = recintoZoo.analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toEqual(['Recinto 4 (espaço livre: 5 total: 8)']);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = recintoZoo.analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toEqual([
          'Recinto 1 (espaço livre: 5 total: 10)',
          'Recinto 2 (espaço livre: 3 total: 5)',
          'Recinto 3 (espaço livre: 2 total: 7)'
        ]);
      });
      
    
});
