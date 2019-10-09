import { mount } from '@vue/test-utils';
import DayView from '@/views/DayView'

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

    const header = wrapper.find('h1#date');
    expect(header.text()).toContain(dateString);
  })

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
