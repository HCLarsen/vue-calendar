import { mount } from '@vue/test-utils';
import MonthView from '@/views/MonthView';

describe('MonthView', () => {
  const octoberWrapper = mount(MonthView, {
    propsData: {
      month: 9,
      year: 2019
    }
  });

  const septemberWrapper = mount(MonthView, {
    propsData: {
      month: 8,
      year: 2019
    }
  });

  it('Renders the correct month name', () => {
    expect(octoberWrapper.html()).toContain('October');
    expect(septemberWrapper.html()).toContain('September');
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
