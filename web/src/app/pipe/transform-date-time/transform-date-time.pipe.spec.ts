import { TransformDateTimePipe } from './transform-date-time.pipe';

describe('TransformDateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new TransformDateTimePipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
