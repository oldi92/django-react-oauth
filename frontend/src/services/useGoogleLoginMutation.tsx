import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { GoogleCredentials, LoginResponse } from "../types";

axios.defaults.withCredentials = true;

const googleLogin = async (credentials: GoogleCredentials) => {
  // return axios.post(
  //   "http://localhost:8000/authentication/google-login/",
  //   credentials
  // );

  try {
    const response: any = await axios.post(
      "http://localhost:8000/authentication/google-login/",
      credentials
    );

    return response;
  } catch (error) {
    console.log("GOOGLE LOGIN ERROR ", error);

    const response = axios.post(
      "http://localhost:8000/authentication/google-connect/",
      credentials
    );

    return response;

    // return error;
  }
};

export const useGoogleLoginMutation = (): UseMutationResult<
  AxiosResponse<LoginResponse, any>,
  AxiosError,
  GoogleCredentials
> => {
  return useMutation(googleLogin);
};
