import { api } from '../services/api/index.service';

export const getProduct = (value: any) => {
  const data = api.POST(`product-classification-detail`, value);
  return data;
};

export const getProductDetail = (value: any) => {
  const data = api.POST(`product-edit-information`, value);
  return data;
};
