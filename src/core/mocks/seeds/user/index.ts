import {Server} from 'miragejs';

const user = (context: Server) => {
  context.createList('user', 5);
};

export default user;
