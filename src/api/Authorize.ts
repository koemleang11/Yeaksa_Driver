import {AuthorizeParams} from '../redux/actionTypes/authorize.type';
import {api} from '../services/api/index.service';

export const getAuthorize = (value: AuthorizeParams) => {
  const data = api.POST(
    `authorize?device_id=${value.device_id}&device_type=${value.device_type}&model=${value.model}`,
  );
  return data;
};
