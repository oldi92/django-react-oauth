import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";

axios.defaults.withCredentials = true;

const tokenVerify = () => {
  return axios.post(
    "http://localhost:8000/authentication/dj-rest-auth/token/verify/",
    {}
  );
};

export const useTokenVerifyMutation = (): UseMutationResult<
  AxiosResponse<any, any>,
  AxiosError
> => {
  return useMutation(tokenVerify);
};
