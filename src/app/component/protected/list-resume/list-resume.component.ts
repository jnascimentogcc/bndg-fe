import {Component, inject, OnDestroy} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {UploadResumeComponent} from './upload-resume/upload-resume.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {ResumeService} from '../../../service/resume.service';

@Component({
  selector: 'app-list-resume',
  imports: [
    DynamicTableComponent,
    UploadResumeComponent,
    SpinnerComponent
  ],
  templateUrl: './list-resume.component.html',
  styleUrl: './list-resume.component.css',
})
export class ListResumeComponent implements OnDestroy {

  intervalId: any;

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  arrColumns: Array<any> = [
    { key: 'candidate_name', label: 'Nome do Candidato', sortable: true },
    { key: 'profile', label: 'Perfil do Candidato', sortable: true }
  ]

  // Upload Config
  isUploadOpen = false;
  openUpload() {
    this.isUploadOpen = true;
  }
  onConfirmUpload() {
    this.isUploadOpen = false;
    this.fetchResume(true);
  }

  // Spinner Config
  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // Resume Service
  resumeService = inject(ResumeService)

  fetchResume(toggle: boolean = false) {
    if (toggle) {
      this.toggleLoading();
    }
    this.resumeService.getAllResume().subscribe({
      next: res => {
        this.arrResume = res.data;
        if (toggle) {
          this.toggleLoading();
        }
      },
      error: err => {},
      complete: () => {}
    });
  }

  arrResume: Array<any> = []
  constructor() {
    this.fetchResume(true);
    this.intervalId = setInterval(() => {
      this.fetchResume(false)
    }, 5000);
  }

  protected onConfirm() {
    console.log('Confirming upload...');
  }
}
