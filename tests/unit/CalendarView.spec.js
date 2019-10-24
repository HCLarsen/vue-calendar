import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import CalendarView from '@/views/CalendarView';
import MonthView from '@/views/MonthView';
import router from '@/router.js';

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('CalendarView', () => {
  it('Renders October 2019', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });

    router.push("/2019/10");

    expect(wrapper.find(MonthView).exists()).toBe(true);
    expect(wrapper.text()).toContain('October');
  });
});
