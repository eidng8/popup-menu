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
          :class="{ 'g8-menu--can__go-back': header }"
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
  @Prop({ default: 'id' }) idKey!: string;

  @Prop({ default: 'label' }) labelKey!: string;

  @Prop({ default: 'subtitle' }) subtitleKey!: string;

  @Prop({ default: 'hint' }) hintKey!: string;

  @Prop({ default: 'checker' }) checkerKey!: string;

  @Prop({ default: 'checked' }) checkedKey!: string;

  @Prop({ default: 'shortcut' }) shortcutKey!: string;

  @Prop({ default: 'children' }) childrenKey!: string;

  items!: G8MenuItem[];

  header = '';

  page = [] as G8MenuItem[];

  anchor = { x: 0, y: 0 };

  path = [] as { header: string; items: G8MenuItem[] }[];

  // noinspection JSUnusedGlobalSymbols
  mounted(): void {
    this.$el.classList.add('g8-menu--off');
  }

  open(items: G8MenuItem[], evt?: MouseEvent): void {
    this.page = this.items = items;
    this.anchor = evt ? { x: evt.clientX, y: evt.clientY } : { x: 0, y: 0 };
    this.$el.classList.remove('g8-menu--off');
    this.$emit('open', evt);
    this.resize();
  }

  close(): void {
    this.page = this.items;
    this.page = [];
    this.header = '';
    this.$el.classList.add('g8-menu--off');
    const el = this.$el.children[0] as HTMLDivElement;
    el.style.left = '';
    el.style.width = '';
    el.style.height = '';
    el.style.top = '';
    this.$emit('close');
  }

  resize(): void {
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

  clicked(evt: G8MenuItemClicked): void {
    if (evt.defaultPrevented) return;
    this.$emit('click', evt);
    if (evt.data) {
      if (evt.data.children && evt.data.children.length) {
        this.push(evt.data);
      } else if (evt.data.checker) {
        this.$emit('state-changed', evt.data);
      } else {
        this.$emit('select', evt.data);
        this.close();
      }
    }
  }

  back(): void {
    this.pop();
  }

  push(item: G8MenuItem): void {
    this.path.push({ header: this.header, items: this.page });
    this.page = item[this.childrenKey] as G8MenuItem[];
    this.header = (item[this.idKey] || item[this.labelKey] || '') as string;
    this.resize();
  }

  pop(): void {
    if (!this.path.length) return;
    const page = this.path.pop()!;
    this.page = page.items;
    this.header = page.header;
    this.resize();
  }
}
</script>
