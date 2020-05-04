<!--
  - GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
  -
  - Author: eidng8
  -->

<template>
  <ul v-if="items">
    <li
      v-for="(item, idx) in items"
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

/**
 * A tree view component with stable DOM structure. Stable means its structure
 * will not change once rendered. This component uses CSS to toggle sub-tree.
 * To improve performance, sub-trees are not rendered until they are first
 * expanded. Once expanded, further collapse/expand action won't cause the
 * sub-tree to be rendered again. Currently there is an
 * [issue](https://github.com/eidng8/vue-tree/issues/24) about performance
 * problem of large tree data set.
 */
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
    if (evt.defaultPrevented) return;
    this.setState(item);
    evt.data = item;
    this.$emit('click', evt);
    this.$forceUpdate();
  }
}
</script>
