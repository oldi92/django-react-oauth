import axios, { AxiosResponse } from "axios";
import { QueryOptions, UseQueryResult, useQuery } from "react-query";
import { EventResponse } from "../types/Events.type";

axios.defaults.withCredentials = true;

const getEvents = () => {
  return axios.get("http://localhost:8000/events/");
};

export const useEventsQuery = (
  options: QueryOptions = {}
): UseQueryResult<AxiosResponse<EventResponse>, unknown> => {
  return useQuery("events", getEvents, options);
};
