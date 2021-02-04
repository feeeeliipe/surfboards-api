import { ExpressServer } from "./server";

// Função autoinvocada para realizar o setup da aplicação e iniciar a instancia
(async () => {
  const server = new ExpressServer();
  await server.setupServer();
  server.startApplication();
})();
