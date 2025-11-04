import {Routes} from '@angular/router';
import {MainLayoutComponent} from './component/infra/main-layout/main-layout.component';
import {EmptyLayoutComponent} from './component/infra/empty-layout/empty-layout.component';
import {ServerErrorComponent} from './component/infra/server-error/server-error.component';
import {NotFoundComponent} from './component/infra/not-found/not-found.component';
import {ResumeComponent} from './component/resume/resume.component';
import {BiddingComponent} from './component/bidding/bidding.component';
import {ProjectComponent} from './component/project/project.component';
import {ShowBiddingComponent} from './component/bidding/show-bidding/show-bidding.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: 'resume', component: ResumeComponent},
      {path: 'bidding', component: BiddingComponent},
      {path: 'project', component: ProjectComponent},
      {path: 'showBidding', component: ShowBiddingComponent},
    ],
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      // {path: 'register', component: RegisterComponent},
    ]
  },
  {path: 'serverError', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent}
];
