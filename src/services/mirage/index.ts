import { createServer, Factory, Model, Response } from "miragejs";
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
      server.createList("user", 200);
    },

    routes() {
      /* As rotas iniciarão com api: "/api/users" **/
      this.namespace = "api";
      this.timing = 750; // esperar em milisegundos

      /** Rotas */
      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { "x-total-count": String(total) }, { users });
      });
      this.get("/users/:id");
      this.post("/users");

      /* Resetar o namespace para não atrapalhar a rota de api do next **/
      this.namespace = "";
      /* passar chamadas api para o nextjs caso não sejam tratadas aqui */
      this.passthrough();
    },
  });

  return server;
}
