import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";

axios.defaults.withCredentials = true;

const socialAccountDisconnect = (id: number) => {
  return axios.post(
    `http://localhost:8000/authentication/socialaccounts/${id}/disconnect/`
  );
};

export const useSocialAccountDisconnectMutation = (): UseMutationResult<
  AxiosResponse<any, any>,
  AxiosError,
  number
> => {
  return useMutation(socialAccountDisconnect);
};
