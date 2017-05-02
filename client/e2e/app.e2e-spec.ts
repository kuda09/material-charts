import { TomiPage } from './app.po';

describe('tomi App', function() {
  let page: TomiPage;

  beforeEach(() => {
    page = new TomiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
