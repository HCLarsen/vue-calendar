import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import CalendarView from '@/views/CalendarView';
// import YearView from '@/views/YearView';
import MonthView from '@/views/MonthView';
// import DayView from '@/views/DayView';
import router from '@/router.js';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Navigation', () => {
  it('Navigates to previous year', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2020");

    const previousYear = wrapper.find('a.previous-year')
    previousYear.trigger('click');

    expect(wrapper.text()).toContain('2019');
    const months = wrapper.findAll('li.month');
    expect(months.length).toBe(12);
  });

  it('Navigates to next year', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2018");

    const nextYear = wrapper.find('a.next-year')
    nextYear.trigger('click');

    expect(wrapper.text()).toContain('2019');
    const months = wrapper.findAll('li.month');
    expect(months.length).toBe(12);
  });

  it('Navigates to clicked on month', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2021");

    const february = wrapper.findAll('li.month > a').at(1);
    february.trigger('click');

    expect(wrapper.find(MonthView).exists()).toBe(true);
    expect(wrapper.find('h1').text()).toContain('February');
  });

  it('Navigates to previous month', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2019/1");

    const nextYear = wrapper.find('a.previous-month')
    nextYear.trigger('click');

    expect(wrapper.text()).toContain('December 2018');
  });

  it('Navigates to next month', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2019/12");

    const nextMonth = wrapper.find('a.next-month');
    nextMonth.trigger('click');

    expect(wrapper.text()).toContain('January 2020');
  });

  it('Navigates to previous day', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2019/10/30");

    const nextDay = wrapper.find('a.previous-day');
    nextDay.trigger('click');

    expect(wrapper.text()).toContain('Tuesday, October 29, 2019');
  });

  it('Navigates to next day', () => {
    const wrapper = mount(CalendarView, {
      localVue,
      router,
    });
    router.push("/2019/10/31");

    const nextMonth = wrapper.find('a.next-day');
    nextMonth.trigger('click');

    expect(wrapper.text()).toContain('Friday, November 1, 2019');
  });
});
