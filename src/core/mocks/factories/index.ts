import PostFactory from './post/_postFactories';
import {UserFactory} from './users';

export const factories = {
  user: UserFactory,
  post: PostFactory,
};
