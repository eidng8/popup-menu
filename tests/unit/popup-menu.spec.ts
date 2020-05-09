/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

import { mount } from '@vue/test-utils';
import { G8MenuItem, G8PopupMenu } from '../../src';

describe('g8-popup-menu', () => {
  it('opens menu', async () => {
    expect.assertions(2);
    const wrapper = mount(G8PopupMenu);
    expect(wrapper.find('.g8-menu--off').exists()).toBeTruthy();
    const menu = wrapper.vm as any;
    menu.open([{ label: 'item' }]);
    await menu.$nextTick();
    expect(wrapper.find('.g8-menu--off').exists()).toBeFalsy();
  });

  it('closes menu', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ label: 'item' }]);
    await menu.$nextTick();
    menu.close();
    await menu.$nextTick();
    expect(wrapper.find('.g8-menu--off').exists()).toBeTruthy();
  });

  it('sets checkbox', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    const item = { label: 'item', checker: true } as G8MenuItem;
    menu.open([item]);
    await menu.$nextTick();
    wrapper.find('.g8-menu__checker').trigger('click');
    await menu.$nextTick();
    expect(item.checked).toBe(true);
  });

  it('shows sub-menu', async () => {
    expect.assertions(2);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ label: 'item', children: [{ label: 'sub' }] }]);
    await menu.$nextTick();
    wrapper.find('.g8-menu__item--has-child').trigger('click');
    await menu.$nextTick();
    expect(wrapper.find('.g8-menu--can__go-back').text()).toBe('item');
    expect(wrapper.find('.g8-menu__label').text()).toBe('sub');
  });

  it('goes back to main menu', async () => {
    expect.assertions(2);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ label: 'item', children: [{ label: 'sub' }] }]);
    await menu.$nextTick();
    wrapper.find('.g8-menu__item--has-child').trigger('click');
    await menu.$nextTick();
    wrapper.find('.g8-menu--can__go-back').trigger('click');
    await menu.$nextTick();
    expect(wrapper.find('.g8-menu--can__go-back').exists()).toBeFalsy();
    expect(wrapper.find('.g8-menu__go-back').text()).toBe('');
  });

  it('ignores `back` button on main menu', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ label: 'item' }]);
    await menu.$nextTick();
    wrapper.find('.g8-menu__go-back').trigger('click');
    await menu.$nextTick();
    expect(wrapper.find('.g8-menu__label').text()).toBe('item');
  });

  it('falls back to item id', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ id: 'key', subtitle: 'item', children: [{ label: 'sub' }] }]);
    await menu.$nextTick();
    wrapper.find('.g8-menu__item--has-child').trigger('click');
    await menu.$nextTick();
    expect(wrapper.find('.g8-menu--can__go-back').text()).toContain('key');
  });

  it('falls back to empty label', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ subtitle: 'item', children: [{ label: 'sub' }] }]);
    await menu.$nextTick();
    wrapper.find('.g8-menu__item--has-child').trigger('click');
    await menu.$nextTick();
    expect(wrapper.find('.g8-menu--can__go-back').text()).toBe('');
  });

  it('defaults to not adding element id', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ id: 'key', label: 'item label' }]);
    await menu.$nextTick();
    expect(wrapper.find('#key').exists()).toBe(false);
  });

  it('adds element id', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu, { propsData: { addElementId: true } });
    const menu = wrapper.vm as any;
    menu.open([{ id: 'key', label: 'item label' }]);
    await menu.$nextTick();
    expect(wrapper.find('#key').text()).toContain('item label');
  });
});
