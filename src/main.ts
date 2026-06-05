import { TerminalController } from "./controllers/TerminalController";

async function main(): Promise<void> {

// RF13:
// O fluxo de demonstração é iniciado aqui.
// A sequência detalhada das chamadas foi movida para o TerminalController
// para manter a aplicação organizada em camadas.
  const controller = new TerminalController();

  await controller.executarDemonstracao();
}

main();