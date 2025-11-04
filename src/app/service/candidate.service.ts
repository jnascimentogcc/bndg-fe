import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BiddingListResponse, BiddingResponse, CandidateListResponse, ProfileListResponse} from '../model/interfaces';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  httpClient = inject(HttpClient);

  getAllCandidates(idProfile: string): Observable<CandidateListResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<CandidateListResponse>(`http://localhost:5000/candidate/list/${idProfile}`, {headers})
  }
}
