# popup-menu

[![master build](https://img.shields.io/travis/com/eidng8/popup-menu?color=333&logo=travis)](https://travis-ci.com/eidng8/popup-menu) [![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/eidng8/popup-menu?color=333&logo=snyk)](https://snyk.io/test/github/eidng8/popup-menu?targetFile=package.json) [![maintainability](https://img.shields.io/codeclimate/maintainability/eidng8/popup-menu?color=333&logo=code-climate)](https://codeclimate.com/github/eidng8/popup-menu/maintainability) [![master coverage](https://img.shields.io/coveralls/github/eidng8/popup-menu/master?color=333&logo=coveralls)](https://coveralls.io/github/eidng8/popup-menu?branch=master) [![dev build](https://img.shields.io/travis/com/eidng8/popup-menu/dev?color=333&label=dev%20build&logo=travis)](https://travis-ci.com/eidng8/popup-menu/tree/dev) [![dev coverage](https://img.shields.io/coveralls/github/eidng8/popup-menu/dev?color=333&label=dev%20coverage&logo=coveralls)](https://coveralls.io/github/eidng8/popup-menu?branch=dev)

A Vue.js multi-level popup menu, using a page like navigation inside the menu container.

[Demo](https://codesandbox.io/s/g8-popup-menu-demo-vq8i7?file=/src/components/HelloWorld.vue)

## Props

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| idKey | Field name in the menu item data set that holds item identifier. Defaults<br>to `'id'`. | string | 'id' |
| labelKey | Field name in the menu item data set that holds item label. Defaults to<br>`'label'`. | string | 'label' |
| subtitleKey | Field name in the menu item data set that holds item subtitle. Defaults to<br>`'subtitle'`. | string | 'subtitle' |
| hintKey | Field name in the menu item data set that holds item tool tip. Defaults to<br>`'hint'`. | string | 'hint' |
| checkerKey | Field name in the menu item data set that tells whether the item has a<br>checkbox attached. Defaults to `'checker'`. | string | 'checker' |
| checkedKey | Field name in the menu item data set that holds item's checkbox is checked.<br>Defaults to `'checked'`. | string | 'checked' |
| shortcutKey | Field name in the menu item data set that holds item keyboard shortcut.<br>Defaults to `'shortcut'`. | string | 'shortcut' |
| childrenKey | Field name in the menu item data set that holds sub-menu item. Defaults to<br>`'children'`. | string | 'children' |

## Slots

| Name     | Description   | Bindings         |
| -------- | ------------- | ---------------- |
| default  | Item label    | item: G8MenuItem |
| subtitle | Item subtitle | item: G8MenuItem |

## Events

| Event name | Type | Description |
| --- | --- | --- |
| open | MouseEvent | The popup menu has been opened. |
| close | G8MenuItem | The popup menu has been closed. |
| click | G8MenuItemClicked | A menu item has been clicked. |
| state-changed | G8MenuItem | A checkbox in the menu item has been checked or unchecked. |
| select | G8MenuItem | A menu item has been selected. |

## Types

```ts
/**
 * Menu item. Fields listed here serve default data structure. There can be
 * arbitrary fields in the data set. Actual fields used in rendering can be
 * customized using component properties such as `idKey`.
 */
export interface G8MenuItem {
  /**
   * Arbitrary field declaration, also enables accessing via index.
   */
  [key: string]: unknown | undefined;

  /**
   * Arbitrary field declaration, also enables accessing via index.
   */
  [key: number]: unknown | undefined;

  /**
   * Default menu item identifier.
   */
  id?: string;

  /**
   * Default menu item label. `'---'` here denotes a separator item. Separator
   * item will not close menu or trigger any event.
   */
  label?: string;

  /**
   * Default menu item subtitle.
   */
  subtitle?: string;

  /**
   * Default menu item tool tip (mouse hover).
   */
  hint?: string;

  /**
   * Whether the item has a checkbox attached. Items with checkbox will not
   * close the menu while clicked. However, the `click` event will be fired,
   * followed by `state-changed` event.
   */
  checker?: boolean;

  /**
   * Whether checkbox of the item has been checked.
   */
  checked?: boolean;

  /**
   * Keyboard shortcut, must be on single character.
   */
  shortcut?: string;

  /**
   * Sub-menu items
   */
  children?: G8MenuItem[];
}

/**
 * A menu item has been clicked.
 */
export class G8MenuItemClicked extends Event {
  /**
   * The item that was clicked.
   */
  data?: G8MenuItem;
}
```
