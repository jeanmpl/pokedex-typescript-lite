import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";
import { APIError } from "../models/CustomErrors";

// RF04 - Função assíncrona para buscar Pokémon na PokeAPI.
// Ela recebe nome ou ID e retorna PokemonResumo em caso de sucesso ou null em caso de erro.

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    try {
        const termoBusca = nomeOuId.trim().toLowerCase();
        
        if (termoBusca.length === 0) {
            console.log("[ERRO] Informe um nome ou ID de Pokémon.");
            return null;
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${termoBusca}`;
        const resposta = await fetch(url);

        // RF05 - Tratamento de erro quando o Pokémon não existe.
        if (!resposta.ok) {
            throw new APIError(`Pokémon não encontrado: ${nomeOuId}`);
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
        if (erro instanceof APIError) {
            console.log(`[ERRO] ${erro.message}`);
            return null;
        }

        console.log("[ERRO] Não foi possível buscar o Pokémon na API.");
        return null;
    }
}