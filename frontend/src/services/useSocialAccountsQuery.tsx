import axios, { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";

axios.defaults.withCredentials = true;

const getSocialAccounts = () => {
  return axios.get("http://localhost:8000/authentication/socialaccounts");
};

export const useSocialAccountsQuery = (): UseQueryResult<
  AxiosResponse<any>,
  AxiosError<any>
> => {
  return useQuery({
    queryKey: ["socialAccounts"],
    queryFn: getSocialAccounts,
    refetchOnWindowFocus: false,
  });
};
