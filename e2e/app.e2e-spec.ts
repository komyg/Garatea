import { GarateaPage } from './app.po';

describe('garatea App', () => {
  let page: GarateaPage;

  beforeEach(() => {
    page = new GarateaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
