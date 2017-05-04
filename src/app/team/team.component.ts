import { Component, OnInit } from '@angular/core';

import { TeamDataService } from '../shared/service/team-data.service';
import { Team } from '../shared/model/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public teamMembers: Team[];
  public numItemsPerPage: number;
  public numPages: number;

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
   * Note: the secreen sizes were taken from bootstrap.
   */
  private setNumItensPerPage() {

    if (window.innerWidth >= 970) {
      this.numItemsPerPage = 4;
    }
    else if (window.innerWidth > 768 && window.innerWidth < 970) {
      this.numItemsPerPage = 2;
    }
    else if (window.innerWidth <= 768) {
      this.numItemsPerPage = 1;
    }
  }

  /**
   * Calculate the number of required pages.
   */
  private setNumPages() {
    this.numPages = Math.ceil(this.teamMembers.length / this.numItemsPerPage);
  }

  /**
   * Callback when the window changes resolution.
   */
  public onWindowChange(e: any) {
    this.setNumPages();
    this.setNumItensPerPage();
  }

}
