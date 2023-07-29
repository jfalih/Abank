import {Server} from 'miragejs';
import registerAuthRoutes from './auth';
import registerPostRoutes from './post';

const routes = (context: Server) => {
  registerAuthRoutes(context);
  registerPostRoutes(context);
};

export default routes;
