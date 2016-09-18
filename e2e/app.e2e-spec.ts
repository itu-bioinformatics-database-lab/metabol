import { MetabolNewPage } from './app.po';

describe('metabol-new App', function() {
  let page: MetabolNewPage;

  beforeEach(() => {
    page = new MetabolNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
