<!--
  - GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
  -
  - Author: eidng8
  -->

<template>
  <ul v-if="items">
    <li
      v-for="(item, idx) in p1"
      :key="idx"
      :id="item[idKey]"
      :class="{
        'g8-menu__checker': item[checkerKey],
        'g8-menu__checker--checked': item[checkedKey],
        'g8-menu--has-child': item[childrenKey] && item[childrenKey].length,
      }"
      @click="clicked(item, $event)"
    >
      <div class="g8-menu__item">
        <div class="g8-menu__label">
          <slot :item="item">
            <label :title="item[hintKey]">{{ item[labelKey] }}</label>
          </slot>
        </div>
        <div class="g8-menu__subtitle">
          <slot name="subtitle" :item="item">
            <label>{{ item[subtitleKey] }}</label>
          </slot>
        </div>
      </div>
    </li>
    <li
      v-for="(item, idx) in p2"
      :key="idx"
      :id="item[idKey]"
      :class="{
        'g8-menu__checker': item[checkerKey],
        'g8-menu__checker--checked': item[checkedKey],
        'g8-menu--has-child': item[childrenKey] && item[childrenKey].length,
      }"
      @click="clicked(item, $event)"
    >
      <div class="g8-menu__item">
        <div class="g8-menu__label">
          <slot :item="item">
            <label :title="item[hintKey]">{{ item[labelKey] }}</label>
          </slot>
        </div>
        <div class="g8-menu__subtitle">
          <slot name="subtitle" :item="item">
            <label>{{ item[subtitleKey] }}</label>
          </slot>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { G8MenuItem, G8MenuItemClicked } from './types';

@Component({ name: 'g8-popup-menu' })
export default class G8PopupMenu extends Vue {
  @Prop({ default: 'id' }) idKey!: string;

  @Prop({ default: 'label' }) labelKey!: string;

  @Prop({ default: 'subtitle' }) subtitleKey!: string;

  @Prop({ default: 'hint' }) hintKey!: string;

  @Prop({ default: 'checker' }) checkerKey!: string;

  @Prop({ default: 'checked' }) checkedKey!: string;

  @Prop({ default: 'shortcut' }) shortcutKey!: string;

  @Prop({ default: 'children' }) childrenKey!: string;

  @Prop({ default: false }) checker!: boolean;

  @Prop() items!: G8MenuItem[];

  p1 = [] as G8MenuItem[];

  p2 = [] as G8MenuItem[];

  path = [] as string[];

  created(): void {
    this.p1 = this.items;
  }

  clicked(item: G8MenuItem, evt: G8MenuItemClicked): void {
    if (evt.defaultPrevented) return;
    this.setState(item);
    evt.data = item;
    this.$emit('click', evt);
    this.$forceUpdate();
  }

  setState(item: G8MenuItem): void {
    if (!item[this.checkerKey]) return;
    item[this.checkedKey] = !item[this.checkedKey];
  }

  push(): void {}

  pop(): void {
    if (!this.path.length) return;
  }
}
</script>
