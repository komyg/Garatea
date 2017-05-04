export class About {

  whatIsIt: { title: string, description: string };
  howItWorks: { title: string, description: string };
  howItStarted: { title: string, description: string, link: string };

  /**
   * Creates a new About object from the values of the input variable.
   * Note: a default constructor is also supported.
   * input - must have a title and a description properties.
   * returns - a new About object.
   */
  constructor(input?: any) {

    if (input) {
      this.whatIsIt = input.whatIsIt;
      this.howItWorks = input.howItWorks;
      this.howItStarted = input.howItStarted;
    }
  }
}
