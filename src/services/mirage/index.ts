import { createServer, Factory, Model } from 'miragejs';
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
      server.createList('user', 10);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
