import {Component, inject, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export enum UploadType {
  RESUME = 'RESUME',
  BIDDING = 'BIDDING'
}

@Component({
  selector: 'app-upload-file',
  imports: [],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.css'
})
export class UploadFile {

  httpClient = inject(HttpClient);

  @Input() textButton: string = 'Upload...';
  @Input() uploadType: UploadType = UploadType.RESUME;
  selectedFile: File[] = [];

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (const file of input.files) {
        this.selectedFile.push(file);
      }
      this.uploadFile();
    }
  }

  uploadFile() {
    if (this.selectedFile.length <= 0) return;

    const formData = new FormData();
    this.selectedFile.forEach((file: File) => {
      formData.append('file', file);
    })

    switch (this.uploadType) {
      case UploadType.BIDDING:
        this.httpClient.post('http://localhost:5000/bidding/upload', formData).subscribe({
          next: (response) => console.log('Upload success', response),
          error: (err) => console.error('Upload error', err),
          complete: () => {}
        });
        break;
      case UploadType.RESUME:
        this.httpClient.post('http://localhost:5000/resume/upload', formData).subscribe({
          next: (response) => console.log('Upload success', response),
          error: (err) => console.error('Upload error', err),
          complete: () => {}
        });
        break;
      default:
        console.log('Upload type failed.');
    }
  }
}
