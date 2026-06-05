import { PokemonResumo } from "../models/Pokemon";
import { formatarPokemon } from ".utils/formatarPokemon";
// RF 12 - Classe simples para organizar o catálogo.
// Ela guarda um arrary interno de Pokémon e oferece métodos para adicionar, listar e remover.

export class CatalogoPokemon {
    private pokemons: PokemonResumo[] = [];

    // RF 08 - Adicionar Pokémon ao catálogo sem permitir duplicidade pelo ID.
    public adicionar(pokemon: PokemonResumo): void {
        const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

        if (jaExiste) {
            console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
            return;
        }
    
        this.pokemons.push(pokemon);
        console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
    }

    // RF 09 - Listar todos os Pokémons salvos no catálogo.
    public listar(): void {
        if (this.pokemons.length === 0) {
            console.log("[AVISO] Catálogo vazio.");
            return;
        }

        console.log("Catálogo atual:");

        this.pokemons.forEach((pokemon) => {
            console.log(formatarPokemon(pokemon));
        });
    }

    // RF 10 - Remover um Pokémon pelo ID.
    public remover(id: number): void {
        const existe = this.pokemons.some((pokemon) => pokemon.id === id);

        if (!existe) {
            console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
            return;
        }

        this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
        console.log("[OK] Pokémon removido do catálogo.");
    }
}