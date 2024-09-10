class AjustaEspaco {
    static validaEspaco(recinto, animal, quantidade, animaisPermitidos) {
        let espacoNecessario = quantidade * animaisPermitidos[animal].tamanho;
        let espacoOcupado = recinto.animais.reduce((total, a) => total + (animaisPermitidos[a.especie].tamanho * a.quantidade), 0);
        let espacoTotal = recinto.tamanhoTotal;
        return espacoTotal - espacoOcupado >= espacoNecessario;
    }

    static calculaEspacoLivre(recinto, animal, quantidade, animaisPermitidos) {
        let espacoOcupado = recinto.animais.reduce((acc, animalExistente) => {
            return acc + (animaisPermitidos[animalExistente.especie].tamanho * animalExistente.quantidade);
        }, 0);
    
        let espacoNecessario = animaisPermitidos[animal].tamanho * quantidade;
        let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
    
        if (recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal)) {
            espacoLivre -= 1;
        }
    
        espacoLivre -= espacoNecessario;
    
        return espacoLivre;
    }
}

export { AjustaEspaco };
