import { mount } from '@vue/test-utils';
import { cleanText } from './../testUtils.js';

import MonthView from '@/views/MonthView';

describe('MonthView', () => {
  const octoberWrapper = mount(MonthView, {
    propsData: {
      month: 9,
      year: 2019
    },
  });

  const septemberWrapper = mount(MonthView, {
    propsData: {
      month: 8,
      year: 2019
    },
  });

  it('Renders the correct header name', () => {
    expect(cleanText(octoberWrapper.text())).toContain('October 2019');
    expect(septemberWrapper.text()).toContain('September');
  });

  it('Renders grid of days', () => {
    const days = octoberWrapper.findAll('li.day');
    expect(days.length).toBe(35);
  });

  it('Renders no extra weeks', () => {
    const days = septemberWrapper.findAll('li.day');
    expect(days.length).toBe(35);
  });
})
