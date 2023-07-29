import response from '../../../utils/response';
import {Request, Response} from 'miragejs';
import {AppSchema} from '../../mocks.types';

const postList = async (schema: AppSchema, request: Request) => {
  const {id_user, limit, page_offset} = request.queryParams;
  const unauthorized = true;
  if (unauthorized) {
    return new Response(
      401,
      {},
      {
        message: 'Error Unauthorized!',
      },
    );
  } else if (!id_user) {
    return response(400, 'Failed get posts!', []);
  } else {
    const posts = schema.db.posts;

    if (Number(limit)) {
      const start = Number(limit) * Number(page_offset);
      const end = start + Number(limit);
      const page = posts.slice(start, end);

      return response(200, '', {
        items: page,
        prevPage: Number(page_offset) > 1 ? Number(page_offset) - 1 : undefined,
        nextPage: posts.length > end ? Number(page_offset) + 1 : undefined,
      });
    } else {
      return response(400, 'Failed get posts!', []);
    }
  }
};

export default postList;
