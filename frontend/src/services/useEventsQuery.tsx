import axios, { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { EventResponse } from "../types/Events.type";

axios.defaults.withCredentials = true;

const getEvents = () => {
  return axios.get("http://localhost:8000/events/");
};

export const useEventsQuery = (): UseQueryResult<
  AxiosResponse<EventResponse>,
  AxiosError<any>
> => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
  });
};
