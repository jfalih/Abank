import {Server} from 'miragejs';

const post = (context: Server) => {
  context.createList('post', 100);
};

export default post;
