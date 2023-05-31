import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, switchMap, mergeMap, filter, toArray } from 'rxjs/operators';
import { OpenWeatherResponse } from '@nx-mono/model';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private _url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getGeolocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    });
  }

  getForecast() {
    return this.getGeolocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '7efd8c021e026bda8a456143a5a6023f');
      }),
      switchMap((params) =>
        this.http.get<OpenWeatherResponse>(this._url, { params })
      ),
      map((res) => res?.list),
      mergeMap((value) => of(...value)),
      filter((value, index) => index % 8 === 0),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
        };
      }),
      toArray()
    );
  }
}
