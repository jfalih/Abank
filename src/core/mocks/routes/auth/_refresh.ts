import response from '../../../utils/response';
import {Request} from 'miragejs';
import {AppSchema} from '../../mocks.types';

const refresh = async (schema: AppSchema, request: Request) => {
  console.log(request.requestHeaders);
  return response(400, 'Successfully get notifications!', []);
};

export default refresh;
