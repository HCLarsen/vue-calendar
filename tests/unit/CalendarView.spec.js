import { mount, createLocalVue } from '@vue/test-utils';
import { cleanText } from './../testUtils.js';
import VueRouter from 'vue-router';

import CalendarView from '@/views/CalendarView';
import YearView from '@/views/YearView';
import MonthView from '@/views/MonthView';
import DayView from '@/views/DayView';
import routes from '@/router/routes.js';

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes.map((e) => { e.path = '/' + e.path; return e; }),
});

const wrapper = mount(CalendarView, {
  localVue,
  router,
});

describe('CalendarView', () => {
  it('Redirects home path to current month', () => {
    expect(wrapper.find(MonthView).exists()).toBe(true);
    const monthName = new Date().toLocaleDateString("en-CA", { month: "long" });
    expect(wrapper.text()).toContain(monthName);
  });

  it('Renders 2019', () => {
    router.push("/2019");

    expect(wrapper.find(YearView).exists()).toBe(true);
  });

  it('Renders September 2019', () => {
    router.push("/2019/9");

    expect(wrapper.find(MonthView).exists()).toBe(true);
    expect(wrapper.text()).toContain('September');
  });

  it('Renders October 31, 2019', () => {
    router.push("/2019/10/31");

    expect(wrapper.find(DayView).exists()).toBe(true);
    expect(cleanText(wrapper.text())).toContain('Thursday, October 31, 2019');
  });

  it('Redirects invalid path to current month', () => {
    router.push("/2018"); // Prevents unresolved promise warning
    router.push("/asdfsadf");

    expect(wrapper.find(MonthView).exists()).toBe(true);
  });

  it('Redirects invalid month path', () => {
    router.push("/2018"); // Prevents unresolved promise warning
    router.push("/2019/131");

    expect(wrapper.find(MonthView).exists()).toBe(true);
  })

  it('Redirects invalid day path', () => {
    router.push("/2018"); // Prevents unresolved promise warning
    router.push("/2019/10/123");

    expect(wrapper.find(MonthView).exists()).toBe(true);
  });
});
