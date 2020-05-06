/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

import { mount } from '@vue/test-utils';
import { G8MenuItem, G8PopupMenu } from '../../src';

describe('g8-popup-menu events', () => {
  it('emits `open` event', async () => {
    expect.assertions(2);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    const evt = new MouseEvent('contextmenu', { clientX: 2000, clientY: 2000 });
    menu.open([{ label: 'item' }], evt);
    await menu.$nextTick();
    const emitted = wrapper.emitted();
    expect(emitted.open.length).toBe(1);
    expect(emitted.open[0][0]).toBe(evt);
  });

  it('emits `close` event', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.close();
    await menu.$nextTick();
    const emitted = wrapper.emitted();
    expect(emitted.close.length).toBe(1);
  });

  it('emits `click` event', async () => {
    expect.assertions(1);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    menu.open([{ label: 'item' }]);
    await menu.$nextTick();
    wrapper.find('li').trigger('click');
    await menu.$nextTick();
    const emitted = wrapper.emitted();
    expect(emitted.click.length).toBe(1);
  });

  it('emits `select` event', async () => {
    expect.assertions(3);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    const item = { label: 'item' };
    menu.open([item]);
    await menu.$nextTick();
    wrapper.find('li').trigger('click');
    await menu.$nextTick();
    const emitted = wrapper.emitted();
    expect(emitted.select.length).toBe(1);
    expect(emitted.select[0][0]).toBe(item);
    expect(emitted.close.length).toBe(1);
  });

  it('emits `state-changed` event', async () => {
    expect.assertions(3);
    const wrapper = mount(G8PopupMenu);
    const menu = wrapper.vm as any;
    const item = { label: 'item', checker: true } as G8MenuItem;
    menu.open([item]);
    await menu.$nextTick();
    wrapper.find('.g8-menu__checker').trigger('click');
    await menu.$nextTick();
    const emitted = wrapper.emitted();
    expect(emitted['state-changed'].length).toBe(1);
    expect(emitted['state-changed'][0][0]).toBe(item);
    expect(item.checked).toBe(true);
  });
});
