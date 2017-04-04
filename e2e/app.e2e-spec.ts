import { FundamentalAnalysisTeacherAngularPage } from './app.po';

describe('fundamental-analysis-teacher-angular App', () => {
  let page: FundamentalAnalysisTeacherAngularPage;

  beforeEach(() => {
    page = new FundamentalAnalysisTeacherAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
