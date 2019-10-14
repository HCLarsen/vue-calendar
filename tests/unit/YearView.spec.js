import { mount } from '@vue/test-utils';
import YearView from '@/views/YearView';

describe('YearView', () => {
  const wrapper = mount(YearView, {
    propsData: {
      year: 2019
    }
  });

  it('Renders proper header', () => {
    expect(wrapper.text()).toContain('2019');
  });

  it('Renders twelve months', () => {
    const months = wrapper.findAll('li.month');
    expect(months.length).toBe(12);
  });

  it('Renders January', () => {
    const january = wrapper.findAll('li.month').at(0);
    expect(january.text()).toContain('January');

    const days = january.findAll('li.day');
    expect(days.length).toBe(31);
  });
});
