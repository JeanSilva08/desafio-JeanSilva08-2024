class ValidaAnimal {
    static validaAnimal(animal, animaisPermitidos) {
        return animaisPermitidos.hasOwnProperty(animal);
    }

    static validaBioma(recinto, animal, animaisPermitidos) {
        return animaisPermitidos[animal].biomas.includes(recinto.bioma);
    }
}

export { ValidaAnimal };
