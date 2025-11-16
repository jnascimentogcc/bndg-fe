import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BiddingListResponse, BiddingResponse, ResponseMessage} from '../model/interfaces';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  httpClient = inject(HttpClient);

  getAllBid(): Observable<BiddingListResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<BiddingListResponse>('http://localhost:5000/bidding/list', {headers})
  }

  uploadBid(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.post('http://localhost:5000/bidding/upload', formData, {headers});
  }

  getBid(idBidding: string):  Observable<BiddingResponse>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.get<BiddingResponse>(`http://localhost:5000/bidding/id/${idBidding}`, {headers})
  }

  evaluateBid(idBidding: string):  Observable<ResponseMessage>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' // TODO: + localStorage.getItem('token'),
    });
    return this.httpClient.post<ResponseMessage>(`http://localhost:5000/bidding/rational/${idBidding}`, {headers})
  }
}
