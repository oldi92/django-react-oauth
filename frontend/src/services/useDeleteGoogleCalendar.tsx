import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation } from "react-query";

axios.defaults.withCredentials = true;

const deleteGoogleCalendar = (calendarId: number) => {
  return axios.delete(
    `http://localhost:8000/integrations/google-calendar/${calendarId}`
  );
};

export const useDeleteGoogleCalendar = (): UseMutationResult<
  AxiosResponse<any, any>,
  AxiosError,
  number
> => {
  return useMutation(deleteGoogleCalendar);
};
