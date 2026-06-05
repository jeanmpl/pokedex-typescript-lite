import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";

// RF04 - Função assíncrona para buscar Pokémon na PokeAPI.
// Ela recebe nome ou ID e retorna PokemonResumo em caso de sucesso ou null em caso de erro.

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId.toLowerCase()}`;
        const resposta = await fetch(url);

        // RF05 - Tratamento de erro quando o Pokémon não existe.
        if (!resposta.ok) {
            console.log(`[ERRO] Pokémon não encontrado: ${nomeOuId}`);
            return null;
        }

        const dados = (await resposta.json()) as PokemonApiResponse;

        // RF06 - Mapeamento da resposta da API para um objeto simplificado.
        const pokemon: PokemonResumo = { 
            id: dados.id,
            nome: dados.name,
            tipos: dados.types.map((item: {type: {name: string}}) => item.type.name),
            altura: dados.height,
            peso: dados.weight
        };

        console.log(`[OK] Pokémon encontrado: ${pokemon.nome}`);
        return pokemon;
    } catch (erro) {
        console.log("[ERRO] Não foi possível buscar o Pokémon.");
        return null;
    }
}