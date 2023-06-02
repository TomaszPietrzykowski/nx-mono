import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { ForecastData } from '@nx-mono/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
  forecast$!: Observable<Array<ForecastData>>;

  constructor(private forecastService: ForecastService) {
    this.forecast$ = this.forecastService.getForecast();
  }
}
