import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  router = inject(Router)

  protected goListResume() {
    this.router.navigate(['/list-resume']).then();
  }

  protected goHome() {
    this.router.navigate(['']).then();
  }
}
