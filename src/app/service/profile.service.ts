import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BiddingListResponse, BiddingResponse, ProfileListResponse} from '../model/interfaces';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  httpClient = inject(HttpClient);

  getAllProfiles(idBidding: string): Observable<ProfileListResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<ProfileListResponse>(`http://localhost:5000/profile/list/${idBidding}`, {headers})
  }
}
