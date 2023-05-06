import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { GoogleCredentials } from "../types";

axios.defaults.withCredentials = true;

const googleLogin = (credentials: GoogleCredentials) => {
  return axios.post(
    "http://localhost:8000/authentication/google-login/",
    credentials
  );
};

export const useGoogleLoginMutation = (): UseMutationResult<
  AxiosResponse<any, any>,
  AxiosError,
  GoogleCredentials
> => {
  return useMutation(googleLogin);
};
