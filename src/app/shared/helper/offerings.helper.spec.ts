import { OfferingsHelper } from './offerings.helper';
import { Offer } from '../model/offer.model';

describe('OfferingsHelper', () => {

  it('should return a col-md-6 class', () => {

    const mockOffer: Offer = {
      title: 'Mock offer',
      subtitle: 'This is a test',
      services: [
        {
          title: 'Service 1',
          description: '',
          icon: '',
          link: ''
        },
        {
          title: 'Service 2',
          description: '',
          icon: '',
          link: ''
        }
      ]
    };

    const result = OfferingsHelper.getColsClass(mockOffer);
    expect(result).toContain('col-md-6');
  });

  it('should return a col-md-4 class', () => {

    const mockOffer: Offer = {
      title: 'Mock offer',
      subtitle: 'This is a test',
      services: [
        {
          title: 'Service 1',
          description: '',
          icon: '',
          link: ''
        },
        {
          title: 'Service 2',
          description: '',
          icon: '',
          link: ''
        },
        {
          title: 'Service 3',
          description: '',
          icon: '',
          link: ''
        }
      ]
    };

    const result = OfferingsHelper.getColsClass(mockOffer);
    expect(result).toContain('col-md-4');
  });

});
