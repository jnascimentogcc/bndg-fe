import {Component, inject} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {UploadResumeComponent} from '../list-resume/upload-resume/upload-resume.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {BiddingService} from '../../../service/bidding.service';
import {ProjectService} from '../../../service/project.service';

@Component({
  selector: 'app-list-project',
  imports: [
    DynamicTableComponent,
    UploadResumeComponent,
    SpinnerComponent
  ],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css',
})
export class ListProjectComponent {

  arrColumns: Array<any> = [
    { key: 'customer_name', label: 'Nome do Cliente', sortable: true },
    { key: 'title', label: 'Título do Projeto', sortable: true },
    { key: 'business_sector', label: 'Setor', sortable: true }
  ]

  // Modal Box Config
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  onConfirm() {
    alert('Confirmed!');
    this.isModalOpen = false;
  }

  // Spinner Config
  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // Resume Service
  projectService = inject(ProjectService)

  arrProject: Array<any> = []
  constructor() {
    this.toggleLoading();
    this.projectService.getPageProject().subscribe({
      next: res => {
        this.arrProject = res.data;
        this.toggleLoading();
      },
      error: err => {},
      complete: () => {}
    })
  }
}
