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
      :class="{ 'g8-menu__item--checked': checked }"
      @click="clicked($event)"
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
      <div class="g8-menu__sub-menu" v-if="item[childrenKey]">
        &gt;
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { G8MenuItem } from './types';

/**
 * A tree view component with stable DOM structure. Stable means its structure
 * will not change once rendered. This component uses CSS to toggle sub-tree.
 * To improve performance, sub-trees are not rendered until they are first
 * expanded. Once expanded, further collapse/expand action won't cause the
 * sub-tree to be rendered again. Currently there is an
 * [issue](https://github.com/eidng8/vue-tree/issues/24) about performance
 * problem of large tree data set.
 */
@Component({ name: 'g8-popup-menu' })
export default class G8PopupMenu extends Vue {
  /**
   * Key of the field in `item` to be used as element's `id` attribute.
   */
  @Prop({ default: 'id' }) idKey!: string;

  /**
   * Key of the field in `item` that holds node label.
   */
  @Prop({ default: 'label' }) labelKey!: string;

  /**
   * Key of the field in `item` that holds node label.
   */
  @Prop({ default: 'subtitle' }) subtitleKey!: string;

  /**
   * Key of the field in tags list of `item` that holds tag tooltip.
   */
  @Prop({ default: 'hint' }) hintKey!: string;

  /**
   * Key of the field in `item` that holds node label.
   */
  @Prop({ default: 'shortcut' }) shortcutKey!: string;

  /**
   * Key of the field in `item` that holds child nodes array.
   */
  @Prop({ default: 'children' }) childrenKey!: string;

  /**
   * Whether to add a checkbox before each item, allowing multiple nodes to
   * be checked.
   */
  @Prop({ default: false }) checker!: boolean;

  /**
   * The menu item data to be rendered. Please note that the `checked` field
   * ***may*** be mutated by this component to reflect its states.
   */
  @Prop() items!: G8MenuItem[];

  /**
   * Whether the node is checked. This must be a member field in order for
   * binding to work.
   */
  checked = false;

  /**
   * Handles the click event of checkboxes. Sets whether the current node is
   * checked. Also set propagates the state to all immediate children.
   * This method emits the `state-changed` event.
   */
  setState(): void {
    this.$emit('state-changed');
  }

  /**
   * Handles click event of nodes, expanding/collapsing sub-tree if
   * applicable. This method emits the `click` event.
   */
  clicked(evt: Event): void {
    this.$emit('click');
  }
}
</script>
