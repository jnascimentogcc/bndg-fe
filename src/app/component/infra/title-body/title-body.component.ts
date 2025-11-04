import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-title-body',
  imports: [],
  templateUrl: './title-body.component.html',
  styleUrl: './title-body.component.css'
})
export class TitleBodyComponent {

  @Input() title: string = '';
  @Input() explainTitle:string = '';
}
