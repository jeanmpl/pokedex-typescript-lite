import { buscarPokemon } from "./services/pokeApi";
import { CatalogoPokemon } from "./services/CatalogoPokemon";


// Nova versão do main com demonstração da aplicação com persistência em arquivo local.
// RF13 - Demonstração do fluxo da aplicação.
// Não há menu interativo. O funcionamento é demonstrado por chamadas diretas de função.

async function main(): Promise<void> {
    
    // Instacia um novo catalogo
    const catalogo = new CatalogoPokemon();

    // Busca o pokemon pikachu e adiciona ao catálogo
    const pikachu = await buscarPokemon("pikachu");
    if (pikachu !== null) {
        await catalogo.adicionar(pikachu);
    }
    const butterfree = await buscarPokemon("butterfree");
    if (butterfree !== null) {
        await catalogo.adicionar(butterfree);
    }

    const pidgeotto = await buscarPokemon("pidgeotto");
    if (pidgeotto !== null) {
        await catalogo.adicionar(pidgeotto);
    }

    const bulbasaur = await buscarPokemon("bulbasaur");
    if (bulbasaur !== null) {
        await catalogo.adicionar(bulbasaur);
    }

    const charmander = await buscarPokemon("charmander");
    if (charmander !== null) {
        await catalogo.adicionar(charmander);
    }

    const squirtle = await buscarPokemon("squirtle");
    if (squirtle !== null) {
        await catalogo.adicionar(squirtle);
    }    

    // Tentar adicionar o pikachu novamente para testar a duplicidade
    const pikachuDuplicado = await buscarPokemon("pikachu");
    if (pikachuDuplicado !== null) {
        await catalogo.adicionar(pikachuDuplicado);
    }

    // Tentar buscar um pokemon inexistente para testar o tratamento de erro

    await buscarPokemon("pokemon-inexistente");

    // Listar os pokemons no catálogo
    await catalogo.listar();

    // Remover o pikachu do catálogo
    await catalogo.remover(25);

    // Listar novamente para verificar a remoção
    await catalogo.listar();
}
main();