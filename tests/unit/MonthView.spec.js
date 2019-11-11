import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import MonthView from '@/views/MonthView';
import router from '@/router.js';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('MonthView', () => {
  const octoberWrapper = mount(MonthView, {
    propsData: {
      month: 9,
      year: 2019
    },
    localVue,
    router,
  });

  const septemberWrapper = mount(MonthView, {
    propsData: {
      month: 8,
      year: 2019
    },
    localVue,
    router,
  });

  it('Renders the correct header name', () => {
    expect(octoberWrapper.text()).toContain('October  2019');
    expect(septemberWrapper.text()).toContain('September');
  });

  it('Renders grid of days', () => {
    const days = octoberWrapper.findAll('li.day');
    expect(days.length).toBe(35);
  });

  it('Renders no extra weeks', () => {
    const days = septemberWrapper.findAll('li.day');
    expect(days.length).toBe(35);
  });
})
