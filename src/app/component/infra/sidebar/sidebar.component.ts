import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  router = inject(Router)

  goResume() {
    this.router.navigate(['/resume']).then();
  }

  goBidding() {
    this.router.navigate(['/bidding']).then();
  }

  goProject() {
    this.router.navigate(['/project']).then();
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']).then()
  }
}
