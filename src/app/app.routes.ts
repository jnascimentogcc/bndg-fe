import {Routes} from '@angular/router';
import {MainLayoutComponent} from './component/infra/main-layout/main-layout.component';
import {EmptyLayoutComponent} from './component/infra/empty-layout/empty-layout.component';
import {ServerErrorComponent} from './component/infra/server-error/server-error.component';
import {NotFoundComponent} from './component/infra/not-found/not-found.component';
import {LoginComponent} from './component/iam/login/login.component';
import {HomeComponent} from './component/protected/home/home.component';
import {ListResumeComponent} from './component/protected/list-resume/list-resume.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent, title: 'Bidding Platform :: Dashboard'},
      {path: 'list-resume', component: ListResumeComponent, title: 'Bidding Platform :: Lista de Candidatos'},
    ],
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent, title: 'Bidding Platform :: Login'},
    ]
  },
  {path: 'serverError', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent}
];
