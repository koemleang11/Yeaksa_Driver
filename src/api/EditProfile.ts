import {AuthorizeParams} from '../redux/actionTypes/authorize.type';
import {api} from '../services/api/index.service';

export const getEdit = () => {
  const data = api.POST(`update-profile`);
  return data;
};
