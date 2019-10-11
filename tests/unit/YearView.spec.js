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
});
