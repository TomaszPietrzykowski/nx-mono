/**
 * Types for project: newspage
 */

export interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

export interface ForecastData {
  dateString: string;
  temp: number;
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}
