import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderBarComponent} from '../header-bar/header-bar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    HeaderBarComponent,
    SidebarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
