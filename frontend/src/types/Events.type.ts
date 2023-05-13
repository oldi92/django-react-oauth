export interface Attendee {
  email: string;
  responseStatus: string;
  self: boolean;
}

export interface Creator {
  email: string;
  self: boolean;
}

export interface EndDate {
  date: string;
}

export interface StartDate {
  dateTime: string;
}

export interface Organizer {
  email: string;
}

export interface Event {
  attendees: Attendee[];
  created: string;
  description: string;
  end: EndDate;
  id: string;
  location: string;
  organizer: Organizer;
  start: StartDate;
  summary: string;
  updated: string;
}

export interface EventResponse {
  accessRole: string;
  items: Event[];
  summary: string;
  timeZone: string;
  updated: string;
}
