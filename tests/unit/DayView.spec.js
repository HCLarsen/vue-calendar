import { mount } from '@vue/test-utils';
import DayView from '@/components/DayView'

describe('DayView', () => {
  const today = new Date();

  const wrapper = mount(DayView, {
    propsData: {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear()
    }
  });

  it('Renders the correct date', () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const dateString = today.toLocaleDateString('en-CA', options);

    expect(wrapper.html()).toContain(`<h1>${dateString}</h1>`)
  })
})
