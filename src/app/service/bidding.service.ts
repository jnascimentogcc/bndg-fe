import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BiddingListResponse, BiddingResponse, ResponseMessage} from '../model/interfaces';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {

  httpClient = inject(HttpClient);

  getAllBidding(): Observable<BiddingListResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<BiddingListResponse>('http://localhost:5000/bidding/list', {headers})
  }

  getBidding(idBidding: string):  Observable<BiddingResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<BiddingResponse>(`http://localhost:5000/bidding/id/${idBidding}`, {headers})
  }

  evaluateBidding(idBidding: string):  Observable<ResponseMessage>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.post<ResponseMessage>(`http://localhost:5000/bidding/rational/${idBidding}`, {headers})
  }
}
