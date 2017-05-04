import { NumberCountPipe } from './number-count.pipe';

describe('NumberCountPipe', () => {

  let pipe: NumberCountPipe;

  beforeEach(() => {
    pipe = new NumberCountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an array with numbers from 0 to value - 1', () => {
    let result: Array<number>;

    result = pipe.transform(4);
    expect(result.length).toBe(4);
    expect(result[0]).toBe(0);
    expect(result[3]).toBe(3);

    result = pipe.transform(1);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(0);
  });

  it('should return an empty array if the value is less than 0', () => {
    const result: Array<number> = pipe.transform(-1);
    expect(result.length).toBe(0);
  });

  it('should return an empty array if the value is equal to 0', () => {
    const result: Array<number> = pipe.transform(0);
    expect(result.length).toBe(0);
  });
});
