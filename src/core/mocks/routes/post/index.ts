import {Server} from 'miragejs';
import {baseUrl} from '../../../http/url';
import postList from './_list';

const registerPostRoutes = (context: Server) => {
  return [context.get(baseUrl('post'), postList)];
};

export default registerPostRoutes;
