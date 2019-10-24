import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import CalendarView from '@/views/CalendarView';
import YearView from '@/views/YearView';
import MonthView from '@/views/MonthView';
import DayView from '@/views/DayView';
import router from '@/router.js';

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('CalendarView', () => {
  it('Renders default path as current month', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });

    expect(wrapper.find(MonthView).exists()).toBe(true);
  });

  it('Renders 2019', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2019");

    expect(wrapper.find(YearView).exists()).toBe(true);
  });

  it('Renders October 2019', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });

    router.push("/2019/10");

    expect(wrapper.find(MonthView).exists()).toBe(true);
    expect(wrapper.text()).toContain('October');
  });

  it('Renders October 31, 2019', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });

    router.push("/2019/10/31");

    expect(wrapper.find(DayView).exists()).toBe(true);
    expect(wrapper.text()).toContain('Thursday, October 31');
  });
});
