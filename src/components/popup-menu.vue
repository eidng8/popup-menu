<!--
  - GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
  -
  - Author: eidng8
  -->

<template>
  <div v-if="items">
    <div class="g8-menu__page">
      <div class="g8-menu__header">
        <button
          class="g8-menu__go-back"
          :class="{ 'g8-menu--can__go-back': path.length }"
          @click="back()"
        >
          &#10148;
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
        :items="p1"
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
    <div class="g8-menu__page g8-menu--off">
      <div class="g8-menu__header">
        <button
          class="g8-menu__go-back"
          :class="{ 'g8-menu--can__go-back': path.length }"
          @click="back()"
        >
          &#10148;
        </button>
        <button class="g8-menu__close" @click="close()">&#215;</button>
      </div>
      <g8-popup-menu-page
        :id-key="idKey"
        :label-key="labelKey"
        :subtitle-key="subtitleKey"
        :hint-key="hintKey"
        :checked-key="checkedKey"
        :checker-key="checkedKey"
        :shortcut-key="shortcutKey"
        :children-key="childrenKey"
        :items="p2"
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
  @Prop({ default: 'id' }) idKey!: string;

  @Prop({ default: 'label' }) labelKey!: string;

  @Prop({ default: 'subtitle' }) subtitleKey!: string;

  @Prop({ default: 'hint' }) hintKey!: string;

  @Prop({ default: 'checker' }) checkerKey!: string;

  @Prop({ default: 'checked' }) checkedKey!: string;

  @Prop({ default: 'shortcut' }) shortcutKey!: string;

  @Prop({ default: 'children' }) childrenKey!: string;

  _items!: G8MenuItem[];

  p1 = [] as G8MenuItem[];

  p2 = [] as G8MenuItem[];

  path = [] as G8MenuItem[][];

  pn = true;

  get items(): G8MenuItem[] {
    return this._items;
  }

  // noinspection JSUnusedGlobalSymbols
  created(): void {
    this.p1 = this._items;
  }

  open(items?: G8MenuItem[], evt?: MouseEvent): void {
    if (items) this._items = items;
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    const mw = this.$el.scrollWidth;
    const mh = this.$el.scrollHeight;
    const x = Math.max(3, (evt && evt.screenX) || (sw - mw - 6) / 2);
    const y = Math.max(3, (evt && evt.screenY) || (sh - mh - 6) / 2);
    const el = this.$el as HTMLDivElement;
    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
    el.style.height = `${Math.min(sh - 3 - x, mh)}px`;
    el.style.width = `${Math.min(sw - 3 - x, mw)}px`;
    this.$el.classList.remove('g8-menu--off');
  }

  close(): void {
    this.$el.classList.add('g8-menu--off');
  }

  clicked(evt: G8MenuItemClicked): void {
    if (evt.defaultPrevented) return;
    this.$emit('click', evt);
    if (evt.data && evt.data.children && evt.data.children.length) {
      this.push(evt.data);
    } else {
      this.$emit('select', evt.data);
    }
    // this.$forceUpdate();
  }

  back(): void {
    this.pop();
  }

  push(item?: G8MenuItem): void {
    if (item && item.children) {
      const pages = (this.$el.children as unknown) as HTMLDivElement[];
      if (this.pn) {
        this.path.push(this.p1);
        this.p2 = item.children;
        pages[0].classList.add('g8-menu--off');
        pages[1].classList.remove('g8-menu--off');
      } else {
        this.path.push(this.p2);
        this.p1 = item.children;
        pages[1].classList.add('g8-menu--off');
        pages[0].classList.remove('g8-menu--off');
      }
      this.pn = !this.pn;
    }
  }

  pop(): void {
    if (!this.path.length) return;
    const last = this.path.pop()!;
    const pages = (this.$el.children as unknown) as HTMLDivElement[];
    if (this.pn) {
      this.p2 = last;
      pages[0].classList.add('g8-menu--off');
      pages[1].classList.remove('g8-menu--off');
    } else {
      this.p1 = last;
      pages[1].classList.add('g8-menu--off');
      pages[0].classList.remove('g8-menu--off');
    }
    this.pn = !this.pn;
  }
}
</script>
