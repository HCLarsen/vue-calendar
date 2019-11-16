import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import YearView from '@/views/YearView';
// import router from '@/router.js';

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
});

describe('YearView', () => {
  const wrapper = mount(YearView, {
    localVue,
    router,
    propsData: {
      year: 2019
    }
  });

  it('Renders proper header', () => {
    const header = wrapper.find('h1');
    expect(header.text()).toContain('2019');
  });

  it('Renders twelve months', () => {
    const months = wrapper.findAll('li.month');
    expect(months.length).toBe(12);
  });

  it('Renders January', () => {
    const january = wrapper.findAll('li.month').at(0);
    expect(january.text()).toContain('January');

    const days = january.findAll('li.day');
    expect(days.length).toBe(35);
  });
});
