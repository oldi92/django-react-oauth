import axios, { AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { Credentials, LoginResponse } from "../types";

axios.defaults.withCredentials = true;

const login = (credentials: Credentials) => {
  return axios.post(
    "http://localhost:8000/authentication/dj-rest-auth/login/",
    credentials
  );
};

export const useLoginMutation = (): UseMutationResult<
  AxiosResponse<LoginResponse, any>,
  any,
  Credentials
> => {
  return useMutation(login);
};
