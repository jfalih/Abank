import response from '../../../utils/response';
import {Request} from 'miragejs';
import {AppSchema} from '../../mocks.types';

const login = async (schema: AppSchema, request: Request) => {
  const {email, password} = JSON.parse(request.requestBody);

  if (!email || !password) {
    return response(400, 'Failed get users!', []);
  } else {
    let user = schema.findBy('user', {
      email,
      password,
    });
    if (user) {
      let token = '';
      user.update('token', token);
      return response(200, 'Successfully get notifications!', user);
    }

    return response(400, 'Successfully get notifications!', []);
  }
};

export default login;
