import { Component } from '@angular/core';
import {InputSearchComponent} from './input-search/input-search.component';
import {SettingsComponent} from './settings/settings.component';
import {NotificationComponent} from './notification/notification.component';
import {AvatarComponent} from './avatar/avatar.component';

@Component({
  selector: 'app-navbar',
  imports: [
    InputSearchComponent,
    SettingsComponent,
    NotificationComponent,
    AvatarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
