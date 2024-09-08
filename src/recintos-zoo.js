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
    console.log(`Analisando recintos para o animal: ${animal}, quantidade: ${quantidade}`);

    if (!this.validaAnimal(animal)) {
      console.log('Animal inválido');
      return { erro: "Animal inválido" };
    }
  
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      console.log('Quantidade inválida');
      return { erro: "Quantidade inválida" };
    }
  
    let recintosViaveis = [];
  
    for (let recinto of this.recintos) {
      console.log(`Verificando o recinto ${recinto.numero}:`, recinto);
      if (this.validaBioma(recinto, animal) &&
          this.validaEspaco(recinto, animal, quantidade) &&
          this.verificaRegrasEspecificas(recinto, animal)) {
        let espacoLivre = this.calculaEspacoLivre(recinto, animal, quantidade);
        console.log(`Espaço livre para ${animal} em recinto ${recinto.numero}: ${espacoLivre}`);
        if (espacoLivre >= 0) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
        }
      }
    }
  
    if (recintosViaveis.length > 0) {
      recintosViaveis.sort();
      console.log('Recintos viáveis encontrados:', recintosViaveis);
      return { recintosViaveis };
    } else {
      console.log('Não há recinto viável');
      return { erro: "Não há recinto viável" };
    }
  }

  validaAnimal(animal) {
    const isValid = this.animaisPermitidos.hasOwnProperty(animal);
    console.log(`Validação de animal (${animal}): ${isValid}`);
    return isValid;
  }

  validaBioma(recinto, animal) {
    const isValid = this.animaisPermitidos[animal].biomas.includes(recinto.bioma);
    console.log(`Validação de bioma (${recinto.bioma} para ${animal}): ${isValid}`);
    return isValid;
  }

  validaEspaco(recinto, animal, quantidade) {
    let espacoNecessario = quantidade * this.animaisPermitidos[animal].tamanho;
    let espacoOcupado = recinto.animais.reduce((total, a) => total + (this.animaisPermitidos[a.especie].tamanho * a.quantidade), 0);
    let espacoTotal = recinto.tamanhoTotal;
  
    console.log(`Espaço necessário: ${espacoNecessario}, espaço ocupado: ${espacoOcupado}, espaço total: ${espacoTotal}`);
  
    return espacoTotal - espacoOcupado >= espacoNecessario;
  }

  verificaRegrasEspecificas(recinto, animal) {
    let regraValida = false;
  
    if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal)) {
      regraValida = recinto.animais.every(a => a.especie === animal);
      console.log(`Regras específicas para carnívoros (${animal}) no recinto ${recinto.numero}: ${regraValida}`);
    } else if (animal === 'HIPOPOTAMO') {
      regraValida = recinto.bioma === 'savana e rio' || recinto.animais.every(a => a.especie === 'HIPOPOTAMO');
      console.log(`Regras específicas para hipopótamos no recinto ${recinto.numero}: ${regraValida}`);
    } else if (animal === 'MACACO') {
      regraValida = recinto.animais.length > 0;
      console.log(`Regras específicas para macacos no recinto ${recinto.numero}: ${regraValida}`);
    } else {
      regraValida = true;
    }
  
    return regraValida;
  }
  

  calculaEspacoLivre(recinto, animal, quantidade) {
    let espacoOcupado = recinto.animais.reduce((acc, animalExistente) => {
      return acc + (this.animaisPermitidos[animalExistente.especie].tamanho * animalExistente.quantidade);
    }, 0);
  
    let espacoNecessario = this.animaisPermitidos[animal].tamanho * quantidade;
    let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
  
    if (recinto.animais.length > 0) {
      espacoLivre -= 1; // Ajuste por mais de uma espécie
    }
  
    espacoLivre -= espacoNecessario;
  
    console.log(`Espaço ocupado: ${espacoOcupado}, espaço livre antes do ajuste: ${espacoLivre + espacoNecessario}, espaço livre após o ajuste: ${espacoLivre}`);
  
    return espacoLivre;
  }
  
}


export { RecintosZoo };
