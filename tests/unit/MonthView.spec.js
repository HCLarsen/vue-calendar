import { mount } from '@vue/test-utils';
import MonthView from '@/views/MonthView';

describe('MonthView', () => {
  const wrapper = mount(MonthView, {
    propsData: {
      month: 9,
      year: 2019
    }
  });

  it('Renders the correct month name', () => {
    expect(wrapper.html()).toContain('October');
  });

  it('Renders grid of days', () => {
    const days = wrapper.findAll('li.day');
    expect(days.length).toBe(31);
  });
})
