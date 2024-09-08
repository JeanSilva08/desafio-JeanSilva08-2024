import Validador from "../classes/validador";

describe('Validador', () => {
  const listaAnimaisPermitidos = ['macaco', 'crocodilo', 'leão', 'hipopótamo'];
  const validador = new Validador(listaAnimaisPermitidos);

  test('Deve validar corretamente o tipo de animal', () => {
    const animalValido = { nome: 'macaco' };
    const animalInvalido = { nome: 'gato' };

    expect(validador.validarTipoAnimal(animalValido)).toBe(true);
    expect(validador.validarTipoAnimal(animalInvalido)).toBe(false);
  });

  test('Deve validar quantidade de animais', () => {
    expect(validador.validarQuantidade(2)).toBe(true);
    expect(validador.validarQuantidade(0)).toBe(false);
    expect(validador.validarQuantidade(-1)).toBe(false);
  });
});
