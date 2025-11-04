import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Observable} from 'rxjs';
import {ToastService} from '../../../service/toast.service';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [
    NgClass,
    AsyncPipe,
    NgIf
  ],
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class ToastComponent implements OnInit {
  message$: Observable<string | null>;
  type$: Observable<'success' | 'error' | 'info'>;

  constructor(private toastService: ToastService) {
    this.message$ = this.toastService.getMessage();
    this.type$ = this.toastService.getType();
  }

  ngOnInit(): void {
  }

  onClose() {
    this.toastService.hide();
  }
}
