/**
 * Reusable TableComponent (Angular) — Tailwind CSS
 * - Drop this file into your Angular project (e.g. src/app/shared/table.component.ts)
 * - It uses inline template + Tailwind utility classes (no additional CSS required)
 * - Features:
 * • configurable columns
 * • client-side sorting
 * • client-side pagination
 * • optional row selection (checkboxes)
 * • simple text search/filter
 * • emits events for row clicks and selection changes
 *
 * Example usage in parent template:
 * <app-table
 * [columns]="columns"
 * [data]="users"
 * [pageSizeOptions]="[5,10,25]"
 * [showSelection]="true"
 * (rowClick)="onRowClick($event)"
 * (selectionChange)="onSelectionChange($event)">
 * </app-table>
 */

import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {ModalBoxComponent} from '../modal-box/modal-box.component';

@Component({
  selector: 'app-dynamic-table',
  imports: [
    FormsModule,
    NgIf,
    NgTemplateOutlet,
    NgForOf,
    ModalBoxComponent
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css',
})
export class DynamicTableComponent implements OnChanges {

  /** Column config: { key: string, label: string, sortable?: boolean, template?: TemplateRef<any> } */
  @Input() columns: Array<any> = [];
  /** Data array */
  @Input() data: any[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() showSelection = false;
  @Input() entityType: any = undefined;

  @Output() rowClick = new EventEmitter<any>();
  @Output() evaluateClick = new EventEmitter<any>();
  @Output() previewClick = new EventEmitter<any>();

  @Output() selectionChange = new EventEmitter<any[]>();


// internal state
  filteredData: any[] = [];
  pagedData: any[] = [];
  page = 1;
  pageSize = 10;
  pageInput = 1;
  totalPages = 1;

  sortKey: string | null = null;
  sortDir: 'asc' | 'desc' = 'asc';

  filterText = '';
  selected: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"]) {
// initialize
      this.filteredData = [...(this.data || [])];
      this.page = 1;
      this.pageSize = this.pageSizeOptions && this.pageSizeOptions.length ? this.pageSizeOptions[0] : 10;
      this.applyAll();
    }
    if (changes["columns"]) {
// keep template references intact
    }
  }

  /** Utilities */
  getProp(obj: any, key: string) {
    if (!obj || !key) return '';
// support nested keys like 'user.name'
    return key.split('.').reduce((acc, part) => acc ? acc[part] : undefined, obj) ?? '';
  }

  applyFilter() {
    const q = (this.filterText || '').toString().trim().toLowerCase();
    if (!q) this.filteredData = [...this.data];
    else {
      this.filteredData = (this.data || []).filter(row => {
        return Object.values(row).some(v => (v ?? '').toString().toLowerCase().includes(q));
      });
    }
    this.goToPage(1);
  }

  sortBy(col: any) {
    if (col.sortable === false) return;
    if (this.sortKey === col.key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = col.key;
      this.sortDir = 'asc';
    }
    this.applySort();
    this.goToPage(1);
  }

  applySort() {
    if (!this.sortKey) return;
    const key = this.sortKey;
    const dir = this.sortDir === 'asc' ? 1 : -1;
    this.filteredData.sort((a, b) => {
      const va = (this.getProp(a, key) ?? '').toString().toLowerCase();
      const vb = (this.getProp(b, key) ?? '').toString().toLowerCase();
      if (!isNaN(Number(va)) && !isNaN(Number(vb))) {
        return (Number(va) - Number(vb)) * dir;
      }
      return va < vb ? -1 * dir : va > vb ? 1 * dir : 0;
    });
  }

  applyAll() {
    this.applyFilter();
    if (this.sortKey) this.applySort();
    this.calculatePages();
    this.updatePagedData();
  }

  calculatePages() {
    this.totalPages = Math.max(1, Math.ceil((this.filteredData || []).length / this.pageSize));
    this.pageInput = this.page;
    this.startRecord = ((this.page - 1) * this.pageSize) + 1;
    this.endRecord = Math.min((this.page * this.pageSize), (this.filteredData || []).length);
  }

  updatePagedData() {
    const start = (this.page - 1) * this.pageSize;
    this.pagedData = (this.filteredData || []).slice(start, start + this.pageSize);
    this.calculatePages();
  }

  goToPage(p: number) {
    const newPage = Math.min(Math.max(1, Number(p) || 1), this.totalPages);
    this.page = newPage;
    this.pageInput = this.page;
    this.updatePagedData();
  }

  // pagination helpers for template
  startRecord = 0;
  endRecord = 0;

  onRowClickInternal(row: any) {
    this.rowClick.emit(row);
  }

  // selection
  isSelected(row: any) {
    return this.selected.indexOf(row) > -1;
  }

  toggleSelect(row: any, checked: boolean) {
    if (checked) {
      if (!this.isSelected(row)) this.selected.push(row);
    } else {
      this.selected = this.selected.filter(r => r !== row);
    }
    this.selectionChange.emit(this.selected.slice());
  }

  allSelectedOnPage() {
    if (!this.pagedData || this.pagedData.length === 0) return false;
    return this.pagedData.every(r => this.isSelected(r));
  }

  toggleSelectAllOnPage(checked: boolean) {
    if (checked) {
      this.pagedData.forEach(r => { if (!this.isSelected(r)) this.selected.push(r); });
    } else {
      this.selected = this.selected.filter(r => !this.pagedData.includes(r));
    }
    this.selectionChange.emit(this.selected.slice());
  }

  row: any = undefined
  evaluateBid(row: any) {
    this.row = row;
    this.openModal();
  }

  previewRational(row: any) {
    this.previewClick.emit(row);
  }

  // Modal Config
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  onConfirmModal() {
    this.isModalOpen = false;
    if (this.row) {
      this.evaluateClick.emit(this.row);
    }
  }

}
