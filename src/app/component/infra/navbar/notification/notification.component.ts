import {Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit, OnDestroy {

  private timerSubscription!: Subscription;
  showPopup = false;
  popupTop = '0px';
  popupLeft = '0px';

  @ViewChild('popupRef') popupRef!: ElementRef;

  eRef = inject(ElementRef)
  httpClient = inject(HttpClient);

  openPopup(event: MouseEvent): void {
    const iconElement = event.target as HTMLElement;
    const rect = iconElement.getBoundingClientRect();

    // Position the popup based on the icon's position
    this.popupTop = `${rect.bottom + window.scrollY}px`; // Below the icon
    this.popupLeft = `${rect.left + window.scrollX - 150}px`;  // Aligned with left edge

    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.showPopup && !this.eRef.nativeElement.contains(event.target)) {
      this.closePopup();
    }
  }

  ngOnInit(): void {
    // this.timerSubscription = interval(60000)
    //   .pipe(
    //     switchMap(() => this.callYourEndpoint()) // Call your method each tick
    //   )
    //   .subscribe({
    //     next: (response) => console.log('API Response:', response),
    //     error: (err) => console.error('Error calling API:', err)
    //   });
    // this.callYourEndpoint().subscribe();
  }

  callYourEndpoint() {
    console.log('Ticker')
    return this.httpClient.get('https://your-api-url.com/endpoint');
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Prevent memory leaks
    }
  }
}
