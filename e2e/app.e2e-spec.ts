import { MetabolPage } from './app.po';

describe('metabol App', () => {
  let page: MetabolPage;

  beforeEach(() => {
    page = new MetabolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
