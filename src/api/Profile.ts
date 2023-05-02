import {api} from '../services/api/index.service';

export const getProfile = () => {
  const data = api.POST(`profile`);
  return data;
};
