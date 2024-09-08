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
      'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
      'GAZELA': { tamanho: 2, biomas: ['savana'] },
      'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
    };
  }

  analisaRecintos(animal, quantidade) {
    console.log(`Analisando recintos para ${quantidade} ${animal}(s)`);

    if (!this.validaAnimal(animal)) {
      console.log('Erro: Animal inválido');
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      console.log('Erro: Quantidade inválida');
      return { erro: "Quantidade inválida" };
    }

    let recintosViaveis = [];

    for (let recinto of this.recintos) {
      console.log(`Verificando Recinto ${recinto.numero} (${recinto.bioma})`);
      console.log(`Espaço total: ${recinto.tamanhoTotal}`);

      if (this.validaBioma(recinto, animal) && this.validaEspaco(recinto, animal, quantidade)) {
        console.log('Recinto é adequado em bioma e espaço');

        if (this.verificaRegrasEspecificas(recinto, animal, quantidade)) {
          let espacoLivre = this.calculaEspacoLivre(recinto, animal, quantidade);
          console.log(`Espaço livre disponível: ${espacoLivre}`);
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
        } else {
          console.log('Recinto não atende às regras específicas para o animal');
        }
      } else {
        console.log('Recinto não atende aos requisitos de bioma ou espaço');
      }
    }

    if (recintosViaveis.length > 0) {
      console.log('Recintos viáveis encontrados:', recintosViaveis);
      return { recintosViaveis: recintosViaveis.sort() };
    } else {
      console.log('Não há recinto viável');
      return { erro: "Não há recinto viável" };
    }
  }

  validaAnimal(animal) {
    const valido = this.animaisPermitidos.hasOwnProperty(animal);
    console.log(`Validação do animal ${animal}: ${valido}`);
    return valido;
  }

  validaBioma(recinto, animal) {
    const valido = this.animaisPermitidos[animal].biomas.includes(recinto.bioma);
    console.log(`Validação do bioma para animal ${animal} no recinto ${recinto.numero}: ${valido}`);
    return valido;
  }

  validaEspaco(recinto, animal, quantidade) {
    let espacoOcupado = recinto.animais.reduce((acum, animalExistente) => {
      return acum + (this.animaisPermitidos[animalExistente.especie].tamanho * animalExistente.quantidade);
    }, 0);

    let espacoNecessario = this.animaisPermitidos[animal].tamanho * quantidade;
    let outrasEspecies = recinto.animais.some(a => a.especie !== animal);

    if (outrasEspecies) espacoNecessario += 1; // Espaço extra para múltiplas espécies

    console.log(`Espaço ocupado no recinto ${recinto.numero}: ${espacoOcupado}`);
    console.log(`Espaço necessário para ${quantidade} ${animal}(s): ${espacoNecessario}`);

    return (recinto.tamanhoTotal - espacoOcupado) >= espacoNecessario;
  }

  verificaRegrasEspecificas(recinto, animal, quantidade) {
    let resultado = true;
    if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal)) {
      resultado = recinto.animais.every(a => a.especie === animal);
    } else if (animal === 'HIPOPOTAMO') {
      resultado = recinto.bioma === 'savana e rio' || recinto.animais.every(a => a.especie === 'HIPOPOTAMO');
    } else if (animal === 'MACACO') {
      resultado = (recinto.animais.length === 0 && quantidade > 1) || 
                  (recinto.animais.length > 0 && this.animaisPermitidos[animal].biomas.includes(recinto.bioma));
    }

    console.log(`Verificação das regras específicas para o recinto ${recinto.numero}: ${resultado}`);
    return resultado;
  }

  calculaEspacoLivre(recinto, animal, quantidade) {
    let espacoOcupado = recinto.animais.reduce((acum, animalExistente) => {
      return acum + (this.animaisPermitidos[animalExistente.especie].tamanho * animalExistente.quantidade);
    }, 0);
    let espacoNecessario = this.animaisPermitidos[animal].tamanho * quantidade;
    let outrasEspecies = recinto.animais.some(a => a.especie !== animal);
    if (outrasEspecies) espacoNecessario += 1; // Adiciona espaço extra para múltiplas espécies

    console.log(`Espaço ocupado final no recinto ${recinto.numero}: ${espacoOcupado}`);
    console.log(`Espaço necessário final para ${quantidade} ${animal}(s): ${espacoNecessario}`);

    return (recinto.tamanhoTotal - espacoOcupado - espacoNecessario);
  }
}

export { RecintosZoo };
