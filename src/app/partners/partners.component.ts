import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { PartnerDataService } from '../shared/service/partner-data.service';
import { Partner } from '../shared/model/partner.model';
import { CarouselHelper } from '../shared/helper/carousel.helper';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  private numItemsPerPage: number;
  private numPages: number;
  private partners: Partner[];

  constructor(private partnerDataService: PartnerDataService) { }

  ngOnInit() {
    window.onresize = this.onWindowChange.bind(this);
    this.setNumItensPerPage();

    this.partnerDataService.getPartnerData().subscribe((partnersData: Partner[]) => {
      this.partners = partnersData;
      this.setNumPages();
    },
    (error: any) => {
      console.error(error);
    });
  }

  /**
   * Sets the max number of items per page on the carousel, based on the current screen resolution.
   */
  private setNumItensPerPage() {
    this.numItemsPerPage = CarouselHelper.calcNumItensPerPage(window.innerWidth);
  }

  /**
   * Calculate the number of required pages.
   */
  private setNumPages() {
    this.numPages = CarouselHelper.calcNumPages(this.partners.length, this.numItemsPerPage);
  }

  /**
   * Callback when the window changes resolution.
   */
  public onWindowChange(e: any) {
    this.setNumItensPerPage();
    this.setNumPages();
  }

}
