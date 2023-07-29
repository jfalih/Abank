import {Server} from 'miragejs';
import user from './user';
import post from './post';

const seeds = (context: Server) => {
  user(context);
  post(context);
};

export default seeds;
