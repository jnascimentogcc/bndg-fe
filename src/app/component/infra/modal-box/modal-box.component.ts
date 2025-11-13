import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal-box',
  imports: [
    NgIf
  ],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.css',
})
export class ModalBoxComponent {

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
