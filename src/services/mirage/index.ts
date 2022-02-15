import { createServer, Factory, Model } from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

/* Criar o servidor de fake api */
export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 10);
    },

    routes() {
      /* As rotas iniciarão com api: "/api/users" **/
      this.namespace = "api";
      this.timing = 750; // esperar em milisegundos

      /** Rotas */
      this.get("/users");
      this.post("/users");

      /* Resetar o namespace para não atrapalhar a rota de api do next **/
      this.namespace = "";
      /* passar chamadas api para o nextjs caso não sejam tratadas aqui */
      this.passthrough();
    },
  });

  return server;
}
