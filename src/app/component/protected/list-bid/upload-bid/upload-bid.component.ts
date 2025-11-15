import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-upload-bid',
  imports: [
    NgIf
  ],
  templateUrl: './upload-bid.component.html',
  styleUrl: './upload-bid.component.css',
})
export class UploadBidComponent {

  @Input() isOpen = false;
  @Input() title = 'Modal Title';
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
  }
}
