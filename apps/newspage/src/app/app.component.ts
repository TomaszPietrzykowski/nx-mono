import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherModule } from './weather/weather.module';
import { NotificationsModule } from './notifications/notifications.module';

@Component({
  standalone: true,
  imports: [RouterModule, WeatherModule, NotificationsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
