import { readFile, writeFile } from "node:fs/promises";
import { LocalBoxError } from "../models/CustomErrors";
import { PokemonResumo } from "../models/Pokemon";
import { formatarPokemon } from "../utils/formatarPokemon";
// RF 12 - Classe para organizar o catálogo.
// Nesta versão final, o catálogo é persistido no arquivo pc_box.json.

export class CatalogoPokemon {

    // Métodos auxiliares privados para ler e escrever o arquivo JSON.
    // Em ambos há definição de tratamento de erro para casos onde o arquivo não pode ser lido ou escrito, lançando um LocalBoxError com mensagem apropriada.
    private readonly caminhoArquivo = "pc_box.json";
    
    private async carregarCatalogo(): Promise<PokemonResumo[]> {
        try {
            const conteudo = await readFile(this.caminhoArquivo, "utf-8");
            const catalogo = JSON.parse(conteudo) as PokemonResumo[];
            return catalogo;
        } catch {
            throw new LocalBoxError("Não foi possível carregar o catálogo.");
        }
    }
    
    private async salvarCatalogo(catalogo: PokemonResumo[]): Promise<void> {
        try {
            const conteudoFormatado = JSON.stringify(catalogo, null, 2);
            await writeFile(this.caminhoArquivo, conteudoFormatado, "utf-8");
        } catch {
            throw new LocalBoxError("Não foi possível salvar o catálogo.");
        }
    }    


    // Métodos públicos para adicionar, listar e remover Pokémons do catálogo.
    // Agora os métodos são async e utilizam os métodos auxiliares construidos acima.
    // RF 08 - Adicionar Pokémon ao catálogo sem permitir duplicidade pelo ID.
    public async adicionar(pokemon: PokemonResumo): Promise<void> {
        try {
            const catalogo = (await this.carregarCatalogo());

            const jaExiste = catalogo.some((item) => item.id === pokemon.id);

            if (jaExiste) {
                console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
                return;
            }
        
            catalogo.push(pokemon);
            await this.salvarCatalogo(catalogo);

            console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
        } catch (erro) {
            if (erro instanceof LocalBoxError) {
                console.log(`[ERRO] ${erro.message}`);
                return;
            }

            console.log("[ERRO] Ocorreu um erro inesperado ao adicionar o Pokémon ao catálogo.");
        }
    }

    // RF 09 - Listar todos os Pokémons salvos no catálogo.
    public async listar(): Promise<void> {
        try {
            const catalogo = await this.carregarCatalogo();

            if (catalogo.length === 0) {
                console.log("[AVISO] Catálogo vazio.");
                return;
            }                

        console.log("Catálogo atual:");

        catalogo.forEach((pokemon) => {
            console.log(formatarPokemon(pokemon));
        });
        } catch (erro) {
            if (erro instanceof LocalBoxError) {
                console.log(`[ERRO] ${erro.message}`);
                return;
            }
            console.log("[ERRO] Ocorreu um erro inesperado ao listar o catálogo.");
        }
    }

    // RF 10 - Remover um Pokémon pelo ID.
    public async remover(id: number): Promise<void> {
        try {
            const catalogo = await this.carregarCatalogo();

            const existe = catalogo.some((pokemon) => pokemon.id === id);

            if (!existe) {
                console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
            return;
            }

            const catalogoAtualizado = catalogo.filter((pokemon) => pokemon.id !== id);
            
            await this.salvarCatalogo(catalogoAtualizado);

            console.log("[OK] Pokémon removido do catálogo.");
        } catch (erro) {
            if (erro instanceof LocalBoxError) {
                console.log(`[ERRO] ${erro.message}`);
                return;
            }

            console.log("[ERRO] Erro inesperado ao remover Pokémon.");
        }
    }
}