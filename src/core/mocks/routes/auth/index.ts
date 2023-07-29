import {Server} from 'miragejs';
import url, {baseUrl} from '../../../http/url';
import login from './_login';
import register from './_register';
import Config from 'react-native-config';
import refresh from './_refresh';

const registerAuthRoutes = (context: Server) => {
  return [
    context.post(url(Config.BASE_URL, 'auth/login'), login),
    context.post(url(Config.BASE_URL, 'auth/register'), register),
    context.post(baseUrl('auth/refresh'), refresh),
  ];
};

export default registerAuthRoutes;
