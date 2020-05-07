<!--
  - GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
  -
  - Author: eidng8
  -->

<template>
  <ul v-if="items">
    <li
      class="g8-menu__item"
      v-for="(item, idx) in items"
      :key="idx"
      :id="item[idKey]"
      :class="{
        'g8-menu__checker': item[checkerKey],
        'g8-menu__checker--checked': item[checkedKey],
        'g8-menu__item--has-child':
          item[childrenKey] && item[childrenKey].length,
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

@Component({ name: 'g8-popup-menu-page' })
export default class G8PopupMenuPage extends Vue {
  @Prop({ default: 'id' }) idKey!: string;

  @Prop({ default: 'label' }) labelKey!: string;

  @Prop({ default: 'subtitle' }) subtitleKey!: string;

  @Prop({ default: 'hint' }) hintKey!: string;

  @Prop({ default: 'checker' }) checkerKey!: string;

  @Prop({ default: 'checked' }) checkedKey!: string;

  @Prop({ default: 'shortcut' }) shortcutKey!: string;

  @Prop({ default: 'children' }) childrenKey!: string;

  @Prop() items!: G8MenuItem[];

  /**
   * Handles the click event of checkboxes. Sets whether the current node is
   * checked. Also set propagates the state to all immediate children.
   * This method emits the `state-changed` event.
   */
  setState(item: G8MenuItem): void {
    if (!item[this.checkerKey]) return;
    item[this.checkedKey] = !item[this.checkedKey];
  }

  /**
   * Handles click event of nodes, expanding/collapsing sub-tree if
   * applicable. This method emits the `click` event.
   */
  clicked(item: G8MenuItem, evt: G8MenuItemClicked): void {
    this.setState(item);
    evt.data = item;
    this.$emit('click', evt);
    this.$forceUpdate();
  }
}
</script>
