import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {BidService} from '../../../service/bid.service';
import {UploadBidComponent} from './upload-bid/upload-bid.component';
import {transformEvaluate} from '../../../util/utils';
import {Router} from '@angular/router';
import {ModalBoxComponent} from '../../infra/modal-box/modal-box.component';

@Component({
  selector: 'app-list-bid',
  imports: [
    DynamicTableComponent,
    SpinnerComponent,
    UploadBidComponent,
    ModalBoxComponent
  ],
  templateUrl: './list-bid.component.html',
  styleUrl: './list-bid.component.css',
})
export class ListBidComponent implements OnDestroy {

  intervalId: any;

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  arrColumns: Array<any> = [
    { key: 'contract_authority', label: 'Nome da Entidade', sortable: true },
    { key: 'reference', label: '# Referência', sortable: true },
    { key: 'notebook_charge_file', label: 'Caderno de Encargo', sortable: true },
    { key: 'procedure_program_file', label: 'Programa de Procedimentos', sortable: true },
    { key: 'evaluated_at', label: 'Analisado em', sortable: true },
    { key: 'evaluated', label: 'Status', sortable: true }
  ]

  // Upload Config
  isUploadOpen = false;
  openUpload() {
    this.isUploadOpen = true;
  }
  onConfirmUpload() {
    this.isUploadOpen = false;
    this.fetchBid(true);
  }

  // Spinner Config
  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // Resume Service
  bidService = inject(BidService)

  fetchBid(toggle: boolean = false) {
    if (toggle) {
      this.toggleLoading();
    }
    this.bidService.getAllBid().subscribe({
      next: res => {
        this.arrBid = [];
        res.data.forEach(bid => {
          this.arrBid.push({
            contract_authority: bid.contract_authority,
            reference: bid.reference,
            notebook_charge_file: bid.notebook_charge_file,
            procedure_program_file: bid.procedure_program_file,
            evaluated_at: bid.evaluated_at,
            evaluated: transformEvaluate(bid.evaluated),
            id: bid.id,
            created_at: bid.created_at
          });
        })
        if (toggle) {
          this.toggleLoading();
        }
      },
      error: err => {},
      complete: () => {}
    })
  }

  arrBid: Array<any> = []
  constructor() {
    this.fetchBid(true);
    this.intervalId = setInterval(() => {
      this.fetchBid(false)
    }, 5000);
  }

  protected onEvaluate($event: any) {
    this.bidService.evaluateBid($event.id).subscribe({
      next: res => {
        this.fetchBid(true);
      },
      error: err => {},
      complete: () => {}
    })
    console.log($event);
  }

  router = inject(Router)

  protected onPreview($event: any) {
    this.router.navigate(['/preview-bid', $event.id]).then();
  }
}
