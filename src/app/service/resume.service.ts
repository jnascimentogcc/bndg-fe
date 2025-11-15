import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResumeListResponse} from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  httpClient = inject(HttpClient);

  getAllResume(): Observable<ResumeListResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<ResumeListResponse>('http://localhost:5000/resume/list', {headers});
  }

  uploadResume(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.post('http://localhost:5000/resume/upload', formData, {headers});
  }
}
