import { createServer, Factory, Model, Response } from 'miragejs';
import { faker } from '@faker-js/faker';

import { User } from '@/types/user';

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return faker.name.fullName();
        },
        email() {
          let userName = '';
          if (this.name) {
            userName = String(this.name).split(' ')[0];
          }
          return faker.internet.email(userName).toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 190);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', (schema, request) => {
        const { page = 1, per_page = 10 } = request.queryParams;

        const usersSchema = schema.all('user');
        const totalUsers = usersSchema.length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = usersSchema.slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(totalUsers) },
          users
        );
      });

      this.get('/users/:id');

      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
