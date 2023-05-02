import { api } from '../services/api/index.service';

export const getClassification = (value: any) => {
  const data = api.POST(`product-classification`, value);
  return data;
};
