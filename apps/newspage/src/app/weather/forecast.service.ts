import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import {
  map,
  switchMap,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry,
} from 'rxjs/operators';
import { OpenWeatherResponse } from '@nx-mono/model';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private _url = 'https://api.openweathermap.org/data/2.5/forecast';
  private _defaultCoordinates: GeolocationCoordinates = {
    accuracy: 1,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    latitude: 52.370216,
    longitude: 4.895168,
  };

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getGeolocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(1),
      tap(() => {
        this.notificationsService.addSuccess('Got your geolocation');
      }),
      catchError((err) => {
        // #1 handle error
        this.notificationsService.addError(
          'Failed to get your location, showing weather for Amsterdam, NL'
        );
        console.error(err);
        // #2 return new Observable that will emit the error
        //    efectively delegate the error handling down the way:
        // return throwError(() => err);
        //    or return defaults for getForecast method:
        return of(this._defaultCoordinates);
      })
    );
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
      toArray(),
      share()
    );
  }
}
