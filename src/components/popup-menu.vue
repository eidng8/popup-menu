<!--
  - GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
  -
  - Author: eidng8
  -->

<template>
  <div v-if="items">
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

  @Prop() items!: G8MenuItem[];

  p1 = [] as G8MenuItem[];

  p2 = [] as G8MenuItem[];

  path = [] as G8MenuItem[][];

  pn = true;

  created(): void {
    this.p1 = this.items;
  }

  clicked(evt: G8MenuItemClicked): void {
    if (evt.defaultPrevented) return;
    this.$emit('click', evt);
    this.push();
    this.$forceUpdate();
  }

  push(): void {
    if (this.pn) this.path.push(this.p1);
    else this.path.push(this.p2);
    this.pn = !this.pn;
  }

  pop(): void {
    if (!this.path.length) return;
    if (this.pn) this.p2 = this.path.pop()!;
    else this.p1 = this.path.pop()!;
    this.pn = !this.pn;
  }
}
</script>
