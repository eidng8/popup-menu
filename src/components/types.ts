/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

export interface G8MenuItem {
  [key: string]: unknown | undefined;
  [key: number]: unknown | undefined;

  id?: string;
  label: string;
  subtitle?: string;
  hint?: string;
  checker?: boolean;
  checked?: boolean;
  shortcut?: string;
  children?: G8MenuItem[];
}

export class G8MenuItemClicked extends Event {
  data?: G8MenuItem;
}
