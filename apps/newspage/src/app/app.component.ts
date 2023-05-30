import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherModule } from './weather/weather.module';

@Component({
  standalone: true,
  imports: [RouterModule, WeatherModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
