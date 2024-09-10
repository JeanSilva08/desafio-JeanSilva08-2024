// src/componentes/recintos-zoo.js

import { ValidaAnimal } from './componentes/valida-animal';
import { AjustaEspaco } from './componentes/ajusta-espaço';
import { CalculaConforto } from './componentes/calcula-conforto';
import { Animal } from './componentes/animal';

class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animaisPermitidos = {
            'LEAO': { tamanho: 3, biomas: ['savana'] },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
            'CROCODILO': { tamanho: 3, biomas: ['rio'] },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta', 'savana e rio'] },
            'GAZELA': { tamanho: 2, biomas: ['savana', 'savana e rio'] },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!ValidaAnimal.validaAnimal(animal, this.animaisPermitidos)) {
            return { erro: "Animal inválido" };
        }
    
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }
    
        let recintosViaveis = [];
    
        for (let recinto of this.recintos) {
            if (ValidaAnimal.validaBioma(recinto, animal, this.animaisPermitidos) &&
                AjustaEspaco.validaEspaco(recinto, animal, quantidade, this.animaisPermitidos) &&
                CalculaConforto.verificaConforto(recinto, animal, this.animaisPermitidos)) {
                let espacoLivre = AjustaEspaco.calculaEspacoLivre(recinto, animal, quantidade, this.animaisPermitidos);
                if (espacoLivre >= 0) {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
                }
            }
        }
    
        if (recintosViaveis.length > 0) {
            recintosViaveis.sort();
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }

    verificaRegrasEspecificas(recinto, animal) {
        // Checa se o animal é permitido e se há regras específicas
        if (this.animaisPermitidos[animal]) {
            // Se há regras específicas para o animal
            return CalculaConforto.verificaConforto(recinto, animal, this.animaisPermitidos);
        }
        // Se o animal não tem regras específicas, deve ser aceito em qualquer recinto
        return true;
    }
}

export { RecintosZoo };
