import type { AxiosResponse } from 'axios';

export enum AuthEndpointsEnum {
  login = '/login',
  register = '/register',
}

export const ResponseAuthInterceptor = (response: AxiosResponse) => {
  const { data, status, config } = response;

  const isSuccess = status.toString().startsWith('2');

  const authEndpoints = [AuthEndpointsEnum.login, AuthEndpointsEnum.register];
  const isAuthEndpoint = authEndpoints.some((endpoint) =>
    config?.url?.match(endpoint)
  );

  return data;
};
