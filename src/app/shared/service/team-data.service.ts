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

      // Parse each element of the JSON object that was received into a Team object.
      const teamArray: Team[] = new Array<Team>();
      for (const data of res.json().team) {
        teamArray.push(new Team(data));
      }

      return teamArray;
    }).catch(this.handleError);
  }

  private handleError(error: Error): string {
    let errorMsg: string;

    errorMsg = 'Ocorreu um erro: ' + error.message + ' por favor entre em contato com o administrador do sistema.';
    console.error(error.message);
    console.error(error.stack);

    return errorMsg;
  }

}
