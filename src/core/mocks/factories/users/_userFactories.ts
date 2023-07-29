import {faker} from '@faker-js/faker';
import {Factory} from 'miragejs';
import {FactoryDefinition, WithFactoryMethods} from 'miragejs/-types';
import {UserType} from '../../models/users';

export const UserFactory: FactoryDefinition<WithFactoryMethods<UserType>> =
  Factory.extend({
    id(n) {
      return n + 1;
    },
    name() {
      return faker.person.fullName();
    },
    email() {
      return faker.internet.email();
    },
    token() {
      return null;
    },
    password() {
      return faker.helpers.arrayElement(['12345678', 'planties', 'oxygen123']); // 'dog'
    },
  });

export default UserFactory;
