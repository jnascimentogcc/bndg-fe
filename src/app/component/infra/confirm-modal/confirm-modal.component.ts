import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Modal} from 'bootstrap';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {

  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  @ViewChild('modal') modalRef!: ElementRef;
  modalInstance: any;

  open() {
    if (!this.modalInstance) {
      this.modalInstance = new Modal(this.modalRef.nativeElement);
    }
    this.modalInstance.show();
  }

  close() {
    this.modalInstance?.hide();
  }

  onConfirm() {
    this.confirmed.emit();
    this.close();
  }

  onCancel() {
    this.canceled.emit();
    this.close();
  }
}
