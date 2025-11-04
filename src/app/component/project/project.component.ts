import {Component, inject, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../infra/confirm-modal/confirm-modal.component';
import {SpinnerComponent} from '../infra/spinner/spinner.component';
import {TitleBodyComponent} from '../infra/title-body/title-body.component';
import {Router} from '@angular/router';
import {ProjectData} from '../../model/interfaces';
import {ProjectService} from '../../service/project.service';

@Component({
  selector: 'app-project',
  imports: [
    ConfirmModalComponent,
    SpinnerComponent,
    TitleBodyComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  router = inject(Router)
  projectService = inject(ProjectService);

  loadingData: boolean = false
  arrProject: ProjectData[] = []
  constructor() {
    this.loadingData = true
    this.projectService.getPageProject().subscribe({
      next: res => {
        console.log(res.data)
        this.arrProject = res.data
        this.loadingData = false;
      },
      error: err => {},
      complete: () => {}
    })
  }

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  addProject() {
    this.router.navigate(['/addProject']).then()
  }

  editProject(idResume: string) {
    this.router.navigate(['/editProject'], {
      queryParams: {cid: idResume},
    }).then()
  }

  showConfirm() {
    this.confirmModal.open();
  }

  handleConfirm() {
    console.log('Confirmed!');
  }

  handleCancel() {
    console.log('Cancelled.');
  }

}
