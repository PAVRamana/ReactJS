import { rest } from 'msw';
import { baseURL, URL } from '../packages/utils/constants';

//Define all the mock api's to handle the request's in local thorugh msw
export const mockHandlers = [
  rest.get(`${baseURL}${URL.configDetails}`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({status:'1'}));
  }),
];
