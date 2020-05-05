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

  path = [] as { header: string; items: G8MenuItem[] }[];

  // noinspection JSUnusedGlobalSymbols
  mounted(): void {
    this.close();
  }

  open(items?: G8MenuItem[], evt?: MouseEvent): void {
    const margin = 3;
    if (items) this.page = this.items = items;
    this.$nextTick(() => {
      this.$el.classList.remove('g8-menu--off');
      const el = this.$el.children[0] as HTMLDivElement;
      const sw = window.innerWidth;
      const sh = window.innerHeight;
      const mw = el.scrollWidth;
      const mh = el.scrollHeight;
      let x = margin;
      let y = margin;
      if (evt) {
        x = Math.max(margin, evt.clientX || 0);
        y = Math.max(margin, evt.clientY || 0);
      }
      if (x + mw + margin > sw) x = Math.max(margin, sw - mw - margin);
      if (y + mh + margin > sh) y = Math.max(margin, sh - mh - margin);
      el.style.top = `${y}px`;
      el.style.left = `${x}px`;
    });
  }

  close(): void {
    this.$el.classList.add('g8-menu--off');
    this.$emit('close');
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
      this.path.push({ header: this.header, items: this.page });
      this.page = item[this.childrenKey] as G8MenuItem[];
      this.header = (item[this.idKey] || item[this.labelKey] || '') as string;
    }
  }

  pop(): void {
    if (!this.path.length) return;
    const page = this.path.pop()!;
    this.page = page.items;
    this.header = page.header;
  }
}
</script>
