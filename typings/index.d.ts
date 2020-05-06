import { Vue } from 'vue-property-decorator';

declare interface G8MenuItem {
  [key: string]: unknown | undefined;
  [key: number]: unknown | undefined;

  id?: string;
  label?: string;
  subtitle?: string;
  hint?: string;
  checker?: boolean;
  checked?: boolean;
  shortcut?: string;
  children?: G8MenuItem[];
}

declare class G8MenuItemClicked extends Event {
  data?: G8MenuItem;
}

declare class G8PopupMenu extends Vue {
  items: G8MenuItem[];

  header: string;

  page: G8MenuItem[];

  anchor: { x: number; y: number };

  path: { header: string; items: G8MenuItem[] }[];

  open(items: G8MenuItem[], evt?: MouseEvent): void;

  close(): void;

  resize(): void;

  clicked(evt: G8MenuItemClicked): void;

  back(): void;

  push(item: G8MenuItem): void;

  pop(): void;
}
