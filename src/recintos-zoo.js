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
    if (!this.validaAnimal(animal)) {
      return { erro: "Animal inválido" };
    }
  
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }
  
    let recintosViaveis = [];
  
    for (let recinto of this.recintos) {
      if (this.validaBioma(recinto, animal) &&
          this.validaEspaco(recinto, animal, quantidade) &&
          this.verificaRegrasEspecificas(recinto, animal)) {
        let espacoLivre = this.calculaEspacoLivre(recinto, animal, quantidade);
        if (espacoLivre >= 0) { // Verifica se o espaço livre é válido
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
        }
      }
    }
  
    if (recintosViaveis.length > 0) {
      return { recintosViaveis: recintosViaveis.sort() };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
  

  validaAnimal(animal) {
    const valido = this.animaisPermitidos.hasOwnProperty(animal);
    console.log(`Animal ${animal} válido: ${valido}`);
    return valido;
  }

  validaBioma(recinto, animal) {
    const biomaValido = this.animaisPermitidos[animal].biomas.includes(recinto.bioma);
    console.log(`Bioma do recinto ${recinto.numero} (${recinto.bioma}) é válido para ${animal}: ${biomaValido}`);
    return biomaValido;
  }

  validaEspaco(recinto, animal, quantidade) {
    let espacoNecessario = quantidade * this.espacoPorAnimal[animal];
    let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.tipo === animal ? this.espacoPorAnimal[a.tipo] : 0), 0);
    let espacoTotal = recinto.tamanhoTotal;
  
    console.log(`Espaço necessário: ${espacoNecessario}, espaço ocupado: ${espacoOcupado}, espaço total: ${espacoTotal}, espaço suficiente: ${espacoTotal - espacoOcupado >= espacoNecessario}`);
  
    return espacoTotal - espacoOcupado >= espacoNecessario;
  }
  

  verificaRegrasEspecificas(recinto, animal) {
    if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal)) {
      const regraValida = recinto.animais.every(a => a.especie === animal);
      console.log(`Regras específicas para ${animal} no recinto ${recinto.numero} válidas: ${regraValida}`);
      return regraValida;
    }
    if (animal === 'HIPOPOTAMO') {
      const regraValida = recinto.bioma === 'savana e rio' || recinto.animais.every(a => a.especie === 'HIPOPOTAMO');
      console.log(`Regras específicas para HIPOPOTAMO no recinto ${recinto.numero} válidas: ${regraValida}`);
      return regraValida;
    }
    if (animal === 'MACACO') {
      // Permitir que macacos compartilhem recinto com outros tipos de animais
      const regraValida = this.animaisPermitidos[animal].biomas.includes(recinto.bioma);
      console.log(`Regras específicas para MACACO no recinto ${recinto.numero} válidas: ${regraValida}`);
      return regraValida;
    }
    return true;
  }
  

  calculaEspacoLivre(recinto, animal, quantidade) {
    let espacoOcupado = recinto.animais.reduce((acc, animalExistente) => {
      return acc + (this.animaisPermitidos[animalExistente.especie].tamanho * animalExistente.quantidade);
    }, 0);
  
    let espacoNecessario = this.animaisPermitidos[animal].tamanho * quantidade;
    let outrasEspecies = recinto.animais.some(a => a.especie !== animal);
  
    if (outrasEspecies) espacoNecessario += 1; // Adiciona espaço extra para múltiplas espécies
  
    const espacoLivre = (recinto.tamanhoTotal - espacoOcupado - espacoNecessario);
    console.log(`Espaço ocupado: ${espacoOcupado}, espaço necessário: ${espacoNecessario}, espaço livre: ${espacoLivre}`);
    return espacoLivre;
  }
}

export { RecintosZoo };
