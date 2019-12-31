import { mount } from '@vue/test-utils';
import { cleanText } from './../testUtils.js';

import DayView from '@/views/DayView'

describe('DayView', () => {
  const wrapper = mount(DayView, {
    propsData: {
      day: 31,
      month: 9,
      year: 2019
    },
  });

  it('Renders October 31, 2019', () => {
    const header = wrapper.find('h1');
    expect(cleanText(header.text())).toContain('Thursday, October 31, 2019');
  });

  it('Renders November 5, 1955', () => {
    const fluxCapacitorDay = mount(DayView, {
      propsData: {
        day: 5,
        month: 10,
        year: 1955
      },
    });

    expect(cleanText(fluxCapacitorDay.text())).toContain('Saturday, November 5, 1955');
  });

  it('Renders in French', () => {
    const VictoriaDay = mount(DayView, {
      propsData: {
        day: 20,
        month: 4,
        year: 2019,
        lang: 'fr',
      },
    });

    expect(cleanText(VictoriaDay.text())).toContain('lundi, mai 20, 2019');
  });

  it('Renders 24 hours of a day', () => {
    const hours = wrapper.findAll('li.hour');
    expect(hours.length).toBe(25);

    const first = hours.at(0);
    expect(first.html()).toContain('12AM');

    const noon = hours.at(12);
    expect(noon.html()).toContain('12PM');

    const last = hours.at(24);
    expect(last.html()).toContain('12AM');
  })

  it('Renders notification for no events', () => {
    expect(wrapper.html()).toContain('No Events');
  })
})
