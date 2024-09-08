class Validador {
    constructor(listaAnimaisPermitidos) {
        this.listaAnimaisPermitidos = listaAnimaisPermitidos;
    }

    validarTipoAnimal(animal) {
        return this.listaAnimaisPermitidos.includes(animal.nome);
    }

    validarQuantidade(quantidade) {
        return quantidade > 0;
    }
}

export default Validador;