interface IAuthorizeParams {
  device_id: string;
  device_type: string;
  model: string;
}

interface IAuthorizeResponse {
  message: boolean;
  status_code: number;
  error: string;
  data: Data;
}

interface Data {
  first_key: string;
  second_key: string;
}

export type AuthorizeParams = IAuthorizeParams;
export type AuthorizeResponse = IAuthorizeResponse;
