/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

/**
 * Menu item. Fields listed here serve default data structure. There can be
 * arbitrary fields in the data set. Actual fields used in rendering can be
 * customized using component properties such as {@link G8PopupMenuPage.idKey}.
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
