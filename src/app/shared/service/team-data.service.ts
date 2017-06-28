import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Team } from '../model/team.model';

@Injectable()
export class TeamDataService {

  private teamDataUrl = 'assets/data/team.json';

  constructor(private http: Http) { }

  /**
   * Retrieves the data that should be displayed in the team component.
   * Returns - a promise containing an array of Team objects.
   */
  public getTeamData(): Promise<Team[]> {

    return this.http.get(this.teamDataUrl).toPromise().then( (res: Response) => {

      if (!res.ok) {
        return this.handleError(res);
      }

      // Parse each element of the JSON object that was received into a Team object.
      const teamArray: Team[] = new Array<Team>();
      for (const data of res.json().team) {
        teamArray.push(new Team(data));
      }

      return teamArray;
    });
  }

  private handleError(error: any): Promise<Team[]> {

    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else if (error) {
      errMsg = error.message ? error.message : error.toString();
    }
    else {
      errMsg = 'An error has occurred in the team data service.';
    }

    console.error(errMsg);
    return Promise.reject(undefined);
  }

}
