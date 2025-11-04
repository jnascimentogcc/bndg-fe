import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectListResponse} from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  httpClient = inject(HttpClient);

  getPageProject(): Observable<ProjectListResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<ProjectListResponse>('http://localhost:5000/project/list', {headers})
  }
}
