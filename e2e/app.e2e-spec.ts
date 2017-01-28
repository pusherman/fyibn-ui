import { FyibnUiPage } from './app.po';

describe('fyibn-ui App', function() {
  let page: FyibnUiPage;

  beforeEach(() => {
    page = new FyibnUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
