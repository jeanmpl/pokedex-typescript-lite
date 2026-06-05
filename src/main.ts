import { buscarPokemon } from "./services/pokeApi";
import { CatalogoPokemon } from "./services/CatalogoPokemon";

// RF13 - Demonstração do fluxo da aplicação.
// Não há menu interativo. O funcionamento é demonstrado por chamadas diretas de função.

async function main(): Promise<void> {
    
    // Instacia um novo catalogo
    const catalogo = new CatalogoPokemon();

    // Busca o pokemon pikachu e adiciona ao catálogo
    const pikachu = await buscarPokemon("pikachu");
    if (pikachu !== null) {
        catalogo.adicionar(pikachu);
    }

    // Busca o pokemon charmander e adiciona ao catálogo
    const charmander = await buscarPokemon("charmander");
    if (charmander !== null) {
        catalogo.adicionar(charmander);
    }

    // Tentar adicionar o pikachu novamente para testar a duplicidade
    const pikachuDuplicado = await buscarPokemon("pikachu");
    if (pikachuDuplicado !== null) {
        catalogo.adicionar(pikachuDuplicado);
    }

    // Tentar buscar um pokemon inexistente para testar o tratamento de erro

    await buscarPokemon("pokemon-inexistente");

    // Listar os pokemons no catálogo
    catalogo.listar();

    // Remover o pikachu do catálogo
    catalogo.remover(25);

    // Listar novamente para verificar a remoção
    catalogo.listar();
}
main();