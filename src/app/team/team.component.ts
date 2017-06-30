import { Component, OnInit } from '@angular/core';

import { TeamDataService } from '../shared/service/team-data.service';
import { Team } from '../shared/model/team.model';
import { CarouselHelper } from '../shared/helper/carousel.helper';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  private teamMembers: Team[];
  private numItemsPerPage: number;
  private numPages: number;

  constructor(private teamDataService: TeamDataService) { }

  ngOnInit() {

    window.onresize = this.onWindowChange.bind(this);
    this.setNumItensPerPage();

    // Get team member data.
    this.teamDataService.getTeamData().then((result: Team[]) => {
      this.teamMembers = result;
      this.setNumPages();
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
    this.numPages = CarouselHelper.calcNumPages(this.teamMembers.length, this.numItemsPerPage);
  }

  /**
   * Callback when the window changes resolution.
   */
  public onWindowChange(e: any) {
    this.setNumItensPerPage();
    this.setNumPages();
  }

}
