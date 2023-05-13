import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { GoogleCredentials, LoginResponse } from "../types";

axios.defaults.withCredentials = true;

const googleConnect = (credentials: GoogleCredentials) => {
  return axios.post(
    "http://localhost:8000/authentication/google-connect/",
    credentials
  );
};

export const useGoogleConnectMutation = (): UseMutationResult<
  AxiosResponse<LoginResponse, any>,
  AxiosError,
  GoogleCredentials
> => {
  return useMutation(googleConnect);
};
