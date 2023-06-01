import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';

@NgModule({
  declarations: [NotificationsListComponent],
  exports: [NotificationsListComponent],
  imports: [CommonModule],
})
export class NotificationsModule {}
