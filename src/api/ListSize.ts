import {api} from '../services/api/index.service';

export const getListSize = () => {
  const data = api.POST(`list-size`);
  return data;
};
