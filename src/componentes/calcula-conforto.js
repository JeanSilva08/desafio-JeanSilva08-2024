class CalculaConforto {
    static verificaConforto(recinto, animal, animaisPermitidos) {
        let regraValida = false;
    
        if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal)) {
            regraValida = recinto.animais.every(a => a.especie === animal);
        } else if (animal === 'HIPOPOTAMO') {
            regraValida = recinto.bioma === 'savana e rio' || recinto.animais.every(a => a.especie === 'HIPOPOTAMO');
        } else if (animal === 'MACACO') {
            regraValida = !recinto.animais.some(a => ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(a.especie));
        } else {
            regraValida = true;
        }
    
        return regraValida;
    }
}

export { CalculaConforto };
