import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type UserType = {
  id: number;
  name: string | null;
  email: string | null;
  password: string;
  token: string | null;
};

export const UserModel: ModelDefinition<UserType> = Model.extend({});
