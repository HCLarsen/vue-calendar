import { mount, createLocalVue } from '@vue/test-utils';
import { cleanText } from './../testUtils.js';
import VueRouter from 'vue-router';

import CalendarView from '@/views/CalendarView';
import YearView from '@/views/YearView';
import MonthView from '@/views/MonthView';
import DayView from '@/views/DayView';
import routes from '@/router/routes.js';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes.map((e) => { e.path = '/' + e.path; return e; }),
});

const wrapper = mount(CalendarView, {
  localVue,
  router,
});

describe('Year Navigation', () => {
  it('Navigates to previous year', () => {
    router.push("/2020");

    const previousYear = wrapper.find('a.previous');
    previousYear.trigger('click');

    expect(wrapper.text()).toContain('2019');
    const months = wrapper.findAll('li.month');
    expect(months.length).toBe(12);
  });

  it('Navigates to next year', () => {
    router.push("/2018");

    const nextYear = wrapper.find('a.next');
    nextYear.trigger('click');

    expect(wrapper.text()).toContain('2019');
    const months = wrapper.findAll('li.month');
    expect(months.length).toBe(12);
  });

  it('Navigates to clicked on month', () => {
    router.push("/2021");

    const february = wrapper.findAll('li.month > a').at(1);
    february.trigger('click');

    expect(wrapper.find(MonthView).exists()).toBe(true);
    expect(cleanText(wrapper.find('h1').text())).toContain('February 2021');
  });
});

describe('Month navigation', () => {
  it('Navigates to previous month', () => {
    router.push("/2019/1");

    const nextYear = wrapper.find('a.previous');
    nextYear.trigger('click');

    expect(cleanText(wrapper.text())).toContain('December 2018');
  });

  it('Navigates to next month', () => {
    router.push("/2019/12");

    const nextMonth = wrapper.find('a.next');
    nextMonth.trigger('click');

    expect(cleanText(wrapper.text())).toContain('January 2020');
  });

  it('Navigates to previous month using second link', () => {
    router.push("/2019/11");

    const nextYear = wrapper.find('li > a.previous');
    nextYear.trigger('click');

    expect(cleanText(wrapper.text())).toContain('October 2019');
  });

  it('Navigates to next month using second link', () => {
    router.push("/2019/6");

    const nextYear = wrapper.find('li > a.next');
    nextYear.trigger('click');

    expect(cleanText(wrapper.text())).toContain('July 2019');
  });

  it('Navigates to year', () => {
    router.push("/2019/10");

    const year = wrapper.find('a.year');
    year.trigger('click');

    expect(wrapper.find(YearView).exists()).toBe(true);
    expect(wrapper.text()).toContain('2019');
  });

  it('Navigates to day', () => {
    router.push("/2019/11");

    const lastDay = wrapper.findAll('li.day:not(.other-month) > a').at(29);
    lastDay.trigger('click');

    expect(wrapper.find(DayView).exists()).toBe(true);
    expect(cleanText(wrapper.text())).toContain('Saturday, November 30, 2019');
  });
});

describe('Day navigation', () => {
  it('Navigates to previous day', () => {
    router.push("/2019/1/1");

    const nextDay = wrapper.find('a.previous');
    nextDay.trigger('click');

    expect(cleanText(wrapper.text())).toContain('Monday, December 31, 2018');
  });

  it('Navigates to next day', () => {
    router.push("/2019/12/31");

    const nextMonth = wrapper.find('a.next');
    nextMonth.trigger('click');

    expect(cleanText(wrapper.text())).toContain('Wednesday, January 1, 2020');
  });

  it('Navigates to month', () => {
    router.push("/2019/11/15");

    const month = wrapper.find('a.month');
    month.trigger('click');

    expect(wrapper.find(MonthView).exists()).toBe(true);
    expect(cleanText(wrapper.text())).toContain('November 2019');
  });

  it('Navigates to year', () => {
    router.push("/2019/11/16");

    const month = wrapper.find('a.year');
    month.trigger('click');

    expect(wrapper.find(YearView).exists()).toBe(true);
    expect(cleanText(wrapper.text())).toContain('2019');
  });
});
