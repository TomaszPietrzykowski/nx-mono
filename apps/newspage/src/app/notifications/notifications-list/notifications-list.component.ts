import { Component } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Observable } from 'rxjs';
import { Notification } from '@nx-mono/model';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent {
  notifications$!: Observable<Array<Notification>>;

  constructor(private notificationsService: NotificationsService) {
    this.notifications$ = this.notificationsService.notificationsOutput;
  }

  clearNotification(id: number): void {
    this.notificationsService.clearMessage(id);
  }
}
