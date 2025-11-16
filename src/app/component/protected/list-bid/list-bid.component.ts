import {Component, inject} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {BidService} from '../../../service/bid.service';
import {UploadBidComponent} from './upload-bid/upload-bid.component';
import {transformEvaluate} from '../../../util/utils';

@Component({
  selector: 'app-list-bid',
  imports: [
    DynamicTableComponent,
    SpinnerComponent,
    UploadBidComponent
  ],
  templateUrl: './list-bid.component.html',
  styleUrl: './list-bid.component.css',
})
export class ListBidComponent {

  arrColumns: Array<any> = [
    { key: 'contract_authority', label: 'Nome da Entidade', sortable: true },
    { key: 'reference', label: '# Referência', sortable: true },
    { key: 'notebook_charge_file', label: 'Caderno de Encargo', sortable: true },
    { key: 'procedure_program_file', label: 'Programa de Procedimentos', sortable: true },
    { key: 'evaluated_at', label: 'Analisado em', sortable: true },
    { key: 'evaluated', label: 'Status', sortable: true }
  ]

  // Modal Box Config
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  onConfirm() {
    this.isModalOpen = false;
    this.fetchBid();
  }

  // Spinner Config
  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // Resume Service
  bidService = inject(BidService)

  fetchBid() {
    this.toggleLoading();
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
        this.toggleLoading();
      },
      error: err => {},
      complete: () => {}
    })
  }

  arrBid: Array<any> = []
  constructor() {
    this.fetchBid();
  }

  protected onEvaluate($event: any) {
    this.bidService.evaluateBid($event.id).subscribe({
      next: res => {
        this.fetchBid();
      },
      error: err => {},
      complete: () => {}
    })
    console.log($event);
  }

  protected onPreview($event: any) {
    this.bidService.getBid($event.id).subscribe({
      next: res => {
        console.log(res.data);
      },
      error: err => {},
      complete: () => {}
    }
    )
  }
}
