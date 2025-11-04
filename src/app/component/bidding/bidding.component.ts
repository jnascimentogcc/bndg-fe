import {Component, inject, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from "../infra/confirm-modal/confirm-modal.component";
import {SpinnerComponent} from "../infra/spinner/spinner.component";
import {TitleBodyComponent} from "../infra/title-body/title-body.component";
import {Router} from '@angular/router';
import {BiddingData} from '../../model/interfaces';
import {BiddingService} from '../../service/bidding.service';
import {EvaluatePipe} from '../../pipe/evaluate-pipe';
import {UploadFile, UploadType} from '../infra/upload-file/upload-file';

@Component({
  selector: 'app-bidding',
  imports: [
    ConfirmModalComponent,
    SpinnerComponent,
    TitleBodyComponent,
    EvaluatePipe,
    UploadFile
  ],
  templateUrl: './bidding.component.html',
  styleUrl: './bidding.component.css'
})
export class BiddingComponent {

  router = inject(Router)
  biddingService = inject(BiddingService);

  loadingData: boolean = false
  arrBidding: BiddingData[] = []
  constructor() {
    this.loadingData = true
    this.biddingService.getAllBidding().subscribe({
      next: res => {
        this.arrBidding = res.data
        this.loadingData = false;
      },
      error: err => {},
      complete: () => {}
    })
  }

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  addBidding() {
    console.log('Upload bidding!');
  }

  showBidding(idBidding: string) {
    this.router.navigate(['/showBidding'], {
      queryParams: {bid: idBidding},
    }).then()
  }

  showConfirm() {
    this.confirmModal.open();
  }

  handleConfirm() {
    console.log('Confirmed!');
  }

  handleCancel() {
    console.log('Cancelled.');
  }

  protected readonly UploadType = UploadType;
}
