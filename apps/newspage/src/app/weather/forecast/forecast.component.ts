import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
  lat!: string;
  lon!: string;
  constructor(forecastService: ForecastService) {
    forecastService.getForecast().subscribe((res) => {
      console.log(res);
    });
  }
}
