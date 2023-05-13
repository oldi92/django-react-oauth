import axios, { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { GoogleCalendar } from "../types";

axios.defaults.withCredentials = true;

const getGoogleCalendar = ({ queryKey }: any) => {
  return axios.get(
    `http://localhost:8000/integrations/google-calendar/get-by-user?user=${queryKey[1]}`
  );
};

export const useGoogleCalendar = (
  userId: any
): UseQueryResult<AxiosResponse<GoogleCalendar>, AxiosError<any>> => {
  return useQuery(["google-calendar", userId], getGoogleCalendar, {
    retry: false,
    refetchOnWindowFocus: false,
  });
};
