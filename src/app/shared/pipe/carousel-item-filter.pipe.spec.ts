import { CarouselItemFilterPipe } from './carousel-item-filter.pipe';
import { Team } from '../model/team.model';

describe('CarouselItemFilterPipe', () => {

  let pipe: CarouselItemFilterPipe;
  let mockData: Team[];

  beforeEach(() => {
    pipe = new CarouselItemFilterPipe();

    mockData = [
      {
        name: 'Person 1',
        bio: 'Lorem ipsum',
        picture: './img/team/01.jpg'
      },
      {
        name: 'Person 2',
        bio: 'Dolor sit amet',
        picture: './img/team/02.jpg'
      },
      {
        name: 'Person 3',
        bio: 'consectetur adipiscing elit.',
        picture: './img/team/03.jpg'
      },
      {
        name: 'Person 4',
        bio: 'Integer venenatis ante lorem,',
        picture: './img/team/04.jpg'
      },
      {
        name: 'Person 5',
        bio: 'sed pulvinar nulla mattis sed.',
        picture: './img/team/05.jpg'
      },
      {
        name: 'Person 6',
        bio: 'Quisque eget faucibus mauris.',
        picture: './img/team/06.jpg'
      },
      {
        name: 'Person 7',
        bio: 'Sed finibus posuere elit,',
        picture: './img/team/07.jpg'
      }
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 4 team members considering a page size of 4 and an offset of 0', () => {

    const result: Team[] = pipe.transform(mockData, 4, 0);
    expect(result.length).toBe(4);
    expect(result[0].name).toBe('Person 1');
    expect(result[3].name).toBe('Person 4');

  });

  it('should return 3 team members considering a page size of 4 and an offset of 1', () => {

    const result: Team[] = pipe.transform(mockData, 4, 1);
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('Person 5');
    expect(result[2].name).toBe('Person 7');

  });

  it('should return 2 team members considering a page size of 2 and an offset of 0', () => {

    const result: Team[] = pipe.transform(mockData, 2, 0);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Person 1');
    expect(result[1].name).toBe('Person 2');

  });

  it('should return 2 team members considering a page size of 2 and an offset of 1', () => {

    const result: Team[] = pipe.transform(mockData, 2, 1);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Person 3');
    expect(result[1].name).toBe('Person 4');

  });

  it('should return 2 team members considering a page size of 2 and an offset of 2', () => {

    const result: Team[] = pipe.transform(mockData, 2, 2);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Person 5');
    expect(result[1].name).toBe('Person 6');

  });

  it('should return 1 team member considering a page size of 2 and an offset of 3', () => {

    const result: Team[] = pipe.transform(mockData, 2, 3);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Person 7');

  });

  it('should return 1 team member considering a page size of 1 and an offset of 0', () => {

    const result: Team[] = pipe.transform(mockData, 1, 0);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Person 1');

  });

  it('should return 1 team member considering a page size of 1 and an offset of 1', () => {

    const result: Team[] = pipe.transform(mockData, 1, 1);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Person 2');

  });

  it('should return 1 team member considering a page size of 1 and an offset of 7', () => {

    const result: Team[] = pipe.transform(mockData, 1, 6);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Person 7');

  });

});
