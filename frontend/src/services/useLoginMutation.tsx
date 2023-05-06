import axios, { AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { Credentials } from "../types";

const login = (credentials: Credentials) => {
  return axios.post(
    "http://localhost:8000/authentication/dj-rest-auth/login/",
    credentials
  );
};

export const useLoginMutation = (): UseMutationResult<
  AxiosResponse<any, any>,
  any,
  Credentials
> => {
  return useMutation(login);
};
