import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BidService} from '../../../service/bid.service';
import {marked} from 'marked';
import {ProfileService} from '../../../service/profile.service';
import {CandidateService} from '../../../service/candidate.service';
import {FinalResumeData} from '../../../model/interfaces';

@Component({
  selector: 'app-preview-bid',
  imports: [],
  templateUrl: './preview-bid.component.html',
  styleUrl: './preview-bid.component.css',
})
export class PreviewBidComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);

  bidService = inject(BidService)
  profileService = inject(ProfileService);
  candidateService = inject(CandidateService);

  invalidBid: boolean = false;

  rational: string = '';
  arrFinalResume: FinalResumeData[] = [];

  ngOnInit() {
    const idBid = this.activatedRoute.snapshot.paramMap.get('idBid');
    if (!idBid) {
      this.invalidBid = true;
    } else {
      this.bidService.getBid(idBid).subscribe({
          next: res => {
            this.rational = res.data['rational']

            this.profileService.getAllProfiles(idBid).subscribe({
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
                      })
                    },
                    error: err => {},
                    complete: () => {}
                  })
                })
              },
              error: err => {},
              complete: () => {}
            })

          },
          error: err => {},
          complete: () => {}
        }
      )
    }
  }

  convertRational() {
    return marked.parse(this.rational).toString();
  }

  protected convertExperience(experience: string) {
    return marked.parse(experience).toString();
  }
}
