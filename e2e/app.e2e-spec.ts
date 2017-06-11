import { VideoExercisePage } from './app.po';

describe('video-exercise App', () => {
  let page: VideoExercisePage;

  beforeEach(() => {
    page = new VideoExercisePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
