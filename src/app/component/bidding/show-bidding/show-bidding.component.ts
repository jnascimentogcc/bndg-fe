import {Component, inject} from '@angular/core';
import {TitleBodyComponent} from '../../infra/title-body/title-body.component';
import {ConfirmModalComponent} from '../../infra/confirm-modal/confirm-modal.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {BiddingService} from '../../../service/bidding.service';
import {ActivatedRoute, Params} from '@angular/router';
import {marked} from 'marked';
import {ProfileService} from '../../../service/profile.service';
import {CandidateService} from '../../../service/candidate.service';
import {FinalResumeData} from '../../../model/interfaces';

@Component({
  selector: 'app-show-bidding',
  imports: [
    TitleBodyComponent,
    ConfirmModalComponent,
    SpinnerComponent
  ],
  templateUrl: './show-bidding.component.html',
  styleUrl: './show-bidding.component.css'
})
export class ShowBiddingComponent {

  loadingData: boolean = false

  biddingService = inject(BiddingService);
  profileService = inject(ProfileService);
  candidateService = inject(CandidateService);

  activatedRoute = inject(ActivatedRoute)

  contractAuthority: string = '';
  reference: string = '';
  pp: string = '';
  ce: string = '';
  rational: string = '';

  queryParams: Params

  arrFinalResume: FinalResumeData[] = [];

  constructor() {
    this.loadingData = true
    this.queryParams = this.activatedRoute.snapshot.queryParams
    this.biddingService.getBidding(this.queryParams['bid']).subscribe({
      next: res => {
        this.contractAuthority = res.data['contract_authority']
        this.reference = res.data['reference']
        this.pp = res.data['procedure_program_file']
        this.ce = res.data['procedure_program_file']
        this.rational = res.data['rational']
        this.loadingData = false;
        this.profileService.getAllProfiles(this.queryParams['bid']).subscribe({
          next: res => {
            res.data.forEach(profile => {
              this.candidateService.getAllCandidates(profile['id']).subscribe({
                next: res => {
                  res.data.forEach(item => {
                    this.arrFinalResume.push({
                      profile: profile,
                      candidate: item,
                      resume: JSON.parse(item.final_resume)
                    })
                    console.log(profile, item)
                  })
                },
                error: err => {
                },
                complete: () => {
                }
              })
            })
          },
          error: err => {
          },
          complete: () => {
          }
        })
      },
      error: err => {
      },
      complete: () => {
      }
    })
  }

  handleConfirm() {
    console.log('Confirmed.');
  }

  handleCancel() {
    console.log('Cancelled.');
  }

  save() {
    console.log('Save.')
  }

  cancel() {
    console.log('Cancelled.');
  }

  protected readonly removeEventListener = removeEventListener;

  convertRational() {
    return marked.parse(this.rational).toString()
  }

  protected readonly JSON = JSON;

  evaluateBidding() {
    this.biddingService.evaluateBidding(this.queryParams['bid']).subscribe({
      next: res => {},
      error: err => {},
      complete: () => {}
    })
  }
}
