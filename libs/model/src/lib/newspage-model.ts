/**
 * Types for project: newspage
 */

export interface OpenWeatherResponse {
  list: {
    dt_text: string;
    main: {
      temp: number;
    };
  }[];
}
