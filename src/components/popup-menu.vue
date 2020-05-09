<!--
  - GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
  -
  - author: eidng8
  -->

<template>
  <div @click.self.stop.prevent="close()" @contextmenu.stop.prevent="close()">
    <div class="g8-menu__page">
      <div class="g8-menu__header">
        <button
          class="g8-menu__go-back"
          :class="{ 'g8-menu--can__go-back': path.length }"
          @click="back()"
        >
          {{ header }}
        </button>
        <button class="g8-menu__close" @click="close()">&#215;</button>
      </div>
      <g8-popup-menu-page
        :id-key="idKey"
        :label-key="labelKey"
        :subtitle-key="subtitleKey"
        :hint-key="hintKey"
        :checked-key="checkedKey"
        :checker-key="checkerKey"
        :shortcut-key="shortcutKey"
        :children-key="childrenKey"
        :add-element-id="addElementId"
        :items="page"
        @click="clicked($event)"
      >
        <template
          v-for="name in Object.keys($scopedSlots)"
          :slot="name"
          slot-scope="slotData"
        >
          <slot :name="name" v-bind="slotData" />
        </template>
      </g8-popup-menu-page>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { G8MenuItem, G8MenuItemClicked } from './types';
import G8PopupMenuPage from './popup-menu-page.vue';

@Component({ name: 'g8-popup-menu', components: { G8PopupMenuPage } })
export default class G8PopupMenu extends Vue {
  /**
   * Field name in the menu item data set that holds item identifier. Defaults
   * to `'id'`.
   */
  @Prop({ default: 'id' }) private idKey!: string;

  /**
   * Field name in the menu item data set that holds item label. Defaults to
   * `'label'`.
   */
  @Prop({ default: 'label' }) private labelKey!: string;

  /**
   * Field name in the menu item data set that holds item subtitle. Defaults to
   * `'subtitle'`.
   */
  @Prop({ default: 'subtitle' }) private subtitleKey!: string;

  /**
   * Field name in the menu item data set that holds item tool tip. Defaults to
   * `'hint'`.
   */
  @Prop({ default: 'hint' }) private hintKey!: string;

  /**
   * Field name in the menu item data set that tells whether the item has a
   * checkbox attached. Defaults to `'checker'`.
   */
  @Prop({ default: 'checker' }) private checkerKey!: string;

  /**
   * Field name in the menu item data set that holds item's checkbox is checked.
   * Defaults to `'checked'`.
   */
  @Prop({ default: 'checked' }) private checkedKey!: string;

  /**
   * Field name in the menu item data set that holds item keyboard shortcut.
   * Defaults to `'shortcut'`.
   */
  @Prop({ default: 'shortcut' }) private shortcutKey!: string;

  /**
   * Field name in the menu item data set that holds sub-menu item. Defaults to
   * `'children'`.
   */
  @Prop({ default: 'children' }) private childrenKey!: string;

  /**
   * Whether to add element id attribute, using the {@link idKey} field. Defaults to `false`.
   */
  @Prop({ default: false }) private addElementId!: boolean;

  /**
   * Menu item data set.
   */
  private items!: G8MenuItem[];

  /**
   * Menu header text. Shown in the `back` button.
   */
  private header = '';

  /**
   * The menu page currently being shown.
   */
  private page = [] as G8MenuItem[];

  /**
   * The coordinate where mouse was clicked.
   */
  private anchor = { x: 0, y: 0 };

  /**
   * A path like array of presented menu pages.
   */
  private path = [] as { header: string; items: G8MenuItem[] }[];

  // noinspection JSUnusedLocalSymbols
  private mounted(): void {
    this.$el.classList.add('g8-menu--off');
  }

  /**
   * Pops up the menu.
   * @param items
   * @param evt
   */
  open(items: G8MenuItem[], evt?: MouseEvent): void {
    this.page = this.items = items;
    this.anchor = evt ? { x: evt.clientX, y: evt.clientY } : { x: 0, y: 0 };
    this.$el.classList.remove('g8-menu--off');
    /**
     * The popup menu has been opened.
     * @type {MouseEvent}
     */
    this.$emit('open', evt);
    this.resize();
  }

  /**
   * Closes the menu.
   */
  close(): void {
    this.page = [];
    this.path = [];
    this.header = '';
    this.$el.classList.add('g8-menu--off');
    const el = this.$el.children[0] as HTMLDivElement;
    el.style.left = '';
    el.style.width = '';
    el.style.height = '';
    el.style.top = '';
    /**
     * The popup menu has been closed.
     * @type {G8MenuItem}
     */
    this.$emit('close');
  }

  /**
   * Resizes the menu to fit content in visible page area.
   */
  private resize(): void {
    const el = this.$el.children[0] as HTMLDivElement;
    el.style.left = '';
    el.style.width = '';
    el.style.height = '';
    el.style.top = '';
    this.$nextTick(() => {
      const margin = 3;
      let x = Math.max(margin, this.anchor.x);
      let y = Math.max(margin, this.anchor.y);
      const sw = window.innerWidth;
      const sh = window.innerHeight;
      let width = el.scrollWidth;
      let height = el.scrollHeight;
      if (x + width + margin > sw) {
        x = Math.max(margin, sw - width - margin);
        width = sw - x - margin;
      }
      el.style.left = `${x}px`;
      el.style.width = `${width}px`;
      if (y + height + margin > sh) {
        y = Math.max(margin, sh - height - margin);
        height = sh - y - margin;
      }
      el.style.height = `${height + 2}px`;
      el.style.top = `${y}px`;
    });
  }

  /**
   * Mouse click event handler.
   * @param evt
   */
  private clicked(evt: G8MenuItemClicked): void {
    /**
     * A menu item has been clicked.
     * @type {G8MenuItemClicked}
     */
    this.$emit('click', evt);
    if (evt.data!.children && evt.data!.children.length) {
      this.push(evt.data!);
    } else if (evt.data!.checker) {
      /**
       * A checkbox in the menu item has been checked or unchecked.
       * @type {G8MenuItem}
       */
      this.$emit('state-changed', evt.data);
    } else {
      /**
       * A menu item has been selected.
       * @type {G8MenuItem}
       */
      this.$emit('select', evt.data);
      this.close();
    }
  }

  /**
   * Go back one menu page.
   */
  private back(): void {
    this.pop();
    this.resize();
  }

  /**
   * Goes to the given sub-menu page.
   * @param item
   */
  private push(item: G8MenuItem): void {
    this.path.push({ header: this.header, items: this.page });
    this.page = item[this.childrenKey] as G8MenuItem[];
    this.header = (item[this.labelKey] || item[this.idKey] || '') as string;
    this.resize();
  }

  /**
   * Pops the previous menu page from history.
   */
  private pop(): void {
    if (!this.path.length) return;
    const page = this.path.pop()!;
    this.page = page.items;
    this.header = page.header;
  }
}
</script>
