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
  shortcut?: string;
  children?: G8MenuItem[];
}
