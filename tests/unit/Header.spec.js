import { mount, createLocalVue } from '@vue/test-utils';
import { cleanText } from './../testUtils.js';
import VueRouter from 'vue-router';

import Header from '@/components/Header.vue';
import routes from '@/router/routes.js';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes.map((e) => { e.path = '/' + e.path; return e; }),
});

describe('Header', () => {
  it('Renders October 31, 2019', () => {
    const wrapper = mount(Header, {
      propsData: {
        day: 31,
        month: 9,
        year: 2019,
      },
      localVue,
      router,
    });

    expect(cleanText(wrapper.text())).toContain('Thursday, October 31, 2019');

    const year = wrapper.find('a.year');
    expect(year.exists()).toBe(true);
    expect(year.attributes('href')).toBe('/2019');

    const month = wrapper.find('a.month');
    expect(month.exists()).toBe(true);
    expect(month.attributes('href')).toBe('/2019/9');
  });

  it('Renders October 2019', () => {
    const wrapper = mount(Header, {
      propsData: {
        month: 9,
        year: 2019,
      },
      localVue,
      router,
    });

    expect(cleanText(wrapper.text())).toContain('October 2019');

    const year = wrapper.find('a.year');
    expect(year.exists()).toBe(true);
    expect(year.attributes('href')).toBe('/2019');
  });

  it('Renders 2019', () => {
    const wrapper = mount(Header, {
      propsData: {
        year: 2019,
      },
      localVue,
      router,
    });

    expect(cleanText(wrapper.text())).toContain('2019');
    const year = wrapper.find('a.year');
    expect(year.exists()).toBe(false);
  });
});
