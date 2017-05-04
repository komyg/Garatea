export class Team {
  name: string;
  bio: string;
  picture: string;

  constructor(inputData?: any) {

    if (inputData) {
      this.name = inputData.name;
      this.bio = inputData.bio;
      this.picture = inputData.picture;
    }
  }
}
