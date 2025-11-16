import {Component, inject} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {BidService} from '../../../service/bid.service';
import {UploadBidComponent} from './upload-bid/upload-bid.component';

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
    { key: 'evaluated', label: 'Analisado ?', sortable: true }
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
  biddingService = inject(BidService)

  fetchBid() {
    this.toggleLoading();
    this.biddingService.getAllBid().subscribe({
      next: res => {
        this.arrBid = res.data;
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
}
