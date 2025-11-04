import {Component, inject, ViewChild} from '@angular/core';
import {TitleBodyComponent} from '../infra/title-body/title-body.component';
import {ConfirmModalComponent} from '../infra/confirm-modal/confirm-modal.component';
import {SpinnerComponent} from '../infra/spinner/spinner.component';
import {Router} from '@angular/router';
import {ResumeData} from '../../model/interfaces';
import {ResumeService} from '../../service/resume.service';
import {UploadFile, UploadType} from '../infra/upload-file/upload-file';

@Component({
  selector: 'app-resume',
  imports: [
    TitleBodyComponent,
    ConfirmModalComponent,
    SpinnerComponent,
    UploadFile
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

  router = inject(Router)
  resumeService = inject(ResumeService);

  loadingData: boolean = false
  arrResume: ResumeData[] = []
  constructor() {
    this.loadingData = true
    this.resumeService.getAllResume().subscribe({
      next: res => {
        console.log(res.data)
        this.arrResume = res.data
        this.loadingData = false;
      },
      error: err => {},
      complete: () => {}
    })
  }

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  editResume(idResume: string) {
    this.router.navigate(['/editResume'], {
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

  protected readonly UploadType = UploadType;
}
