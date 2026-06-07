import { buscarPokemon } from "../services/pokeApi";
import { CatalogoPokemon } from "../services/CatalogoPokemon";

export class TerminalController {
    private catalogo = new CatalogoPokemon();

    public async executarDemonstracao(): Promise<void> {
        console.log(" === Demonstração da Pokedex TypeScript Lite ===");

       // Busca e adiciona vários pokémons ao catálogo (os primeiros 6 do Ash na série original).
       const pikachu = await buscarPokemon("pikachu");
        if (pikachu !== null) {
            await this.catalogo.adicionar(pikachu);
        }
    
        const butterfree = await buscarPokemon("butterfree");
        if (butterfree !== null) {
            await this.catalogo.adicionar(butterfree);
        }

        const pidgeotto = await buscarPokemon("pidgeotto");
        if (pidgeotto !== null) {
            await this.catalogo.adicionar(pidgeotto);
        }

        const bulbasaur = await buscarPokemon("bulbasaur");
        if (bulbasaur !== null) {
            await this.catalogo.adicionar(bulbasaur);
        }

        const charmander = await buscarPokemon("charmander");
        if (charmander !== null) {
            await this.catalogo.adicionar(charmander);
        }

        const squirtle = await buscarPokemon("squirtle");
        if (squirtle !== null) {
            await this.catalogo.adicionar(squirtle);
        }    
    
        // Tenta adicionar o pikachu novamente para testar a duplicidade
        const pikachuDuplicado = await buscarPokemon("pikachu");
        if (pikachuDuplicado !== null) {
            await this.catalogo.adicionar(pikachuDuplicado);
        }
    
        // Tenta buscar um pokemon inexistente para testar o tratamento de erro
        await buscarPokemon("pokemon-inexistente");

        // Busca vazia para demonstrar tratamento de erro
        await buscarPokemon("  ");

        // Lista os pokemons no catálogo
        await this.catalogo.listar();
 
        // Remove o pikachu do catálogo
        await this.catalogo.remover(25);    

        // Lista novamente para verificar a remoção
        await this.catalogo.listar();

        // Tenta remover pikachu novamente para testar o tratamento do erro de remoção
        await this.catalogo.remover(25);
    }
}