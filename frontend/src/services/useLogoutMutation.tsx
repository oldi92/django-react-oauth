import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";

axios.defaults.withCredentials = true;

const logout = () => {
  return axios.post(
    "http://localhost:8000/authentication/dj-rest-auth/logout/"
  );
};

export const useLogoutMutation = (): UseMutationResult<
  AxiosResponse<any, any>,
  AxiosError
> => {
  return useMutation(logout);
};
