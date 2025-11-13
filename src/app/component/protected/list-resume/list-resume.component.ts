import { Component } from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-list-resume',
  imports: [
    DynamicTableComponent
  ],
  templateUrl: './list-resume.component.html',
  styleUrl: './list-resume.component.css',
})
export class ListResumeComponent {

  arrColumns: Array<any> = [
    { key: 'name', label: 'Nome do Candidato', sortable: true },
    { key: 'profile', label: 'Perfil do Candidato', sortable: true }
  ]

  arrData: Array<any> = [
    { name: 'Candidato 1', profile: 'Desenvolvedor' },
    { name: 'Candidato 2', profile: 'Analista de Sistemas' },
    { name: 'Candidato 1', profile: 'Desenvolvedor' },
    { name: 'Candidato 2', profile: 'Analista de Sistemas' },
    { name: 'Candidato 1', profile: 'Desenvolvedor' },
    { name: 'Candidato 2', profile: 'Analista de Sistemas' },
    { name: 'Candidato 1', profile: 'Desenvolvedor' },
    { name: 'Candidato 2', profile: 'Analista de Sistemas' },
    { name: 'Candidato 1', profile: 'Desenvolvedor' },
    { name: 'Candidato 2', profile: 'Analista de Sistemas' },
    { name: 'Candidato 1', profile: 'Desenvolvedor' },
    { name: 'Candidato 2', profile: 'Analista de Sistemas' },
  ]
}
