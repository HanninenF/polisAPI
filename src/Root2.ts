import { allowedEventTypes } from "./data";
export namespace AllTypes {
  export type Event = {
    id: number;
    datetime: string;
    name: string;
    summary: string;
    url: string;
    type: string;
    location: Location;
  };

  export type Location = {
    name: string;
    gps: string;
  };
}

export type AllowedEventTypes = (typeof allowedEventTypes)[number];
