import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private message$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private type$: BehaviorSubject<'success' | 'error' | 'info'> = new BehaviorSubject<'success' | 'error' | 'info'>('info');

  getMessage(): Observable<string | null> {
    return this.message$.asObservable();
  }

  getType(): Observable<'success' | 'error' | 'info'> {
    return this.type$.asObservable();
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message$.next(message);
    this.type$.next(type);
    setTimeout(() => {
      this.hide();
    }, 5000); // The message will disappear after 5 seconds
  }

  hide() {
    this.message$.next(null);
  }
}
