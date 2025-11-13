import {Component, inject} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {ModalBoxComponent} from '../../infra/modal-box/modal-box.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {ResumeService} from '../../../service/resume.service';

@Component({
  selector: 'app-list-resume',
  imports: [
    DynamicTableComponent,
    ModalBoxComponent,
    SpinnerComponent
  ],
  templateUrl: './list-resume.component.html',
  styleUrl: './list-resume.component.css',
})
export class ListResumeComponent {

  arrColumns: Array<any> = [
    { key: 'candidate_name', label: 'Nome do Candidato', sortable: true },
    { key: 'profile', label: 'Perfil do Candidato', sortable: true }
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
  resumeService = inject(ResumeService)

  arrResume: Array<any> = []
  loadingData = true;
  constructor() {
    this.toggleLoading();
    this.resumeService.getAllResume().subscribe({
      next: res => {
        this.arrResume = res.data;
        this.toggleLoading();
      },
      error: err => {},
      complete: () => {}
    })
  }
}
