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
        'g8-menu__separator': '---' == item[labelKey],
        'g8-menu__checker': item[checkerKey],
        'g8-menu__checker--checked': item[checkedKey],
        'g8-menu__item--has-child':
          item[childrenKey] && item[childrenKey].length,
      }"
      @click="clicked(item, $event)"
    >
      <div v-if="'---' == item[labelKey]">
        <hr />
      </div>
      <div v-else>
        <div class="g8-menu__label">
          <!--
           @slot Item label
           @binding {G8MenuItem} item
           -->
          <slot :item="item">
            <label :title="item[hintKey]">{{ item[labelKey] }}</label>
          </slot>
        </div>
        <div class="g8-menu__subtitle">
          <!--
          @slot Item subtitle
          @binding {G8MenuItem} item
          -->
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
  /**
   * Field name in the menu item data set that holds item identifier. Defaults
   * to `'id'`.
   */
  @Prop({ default: 'id' }) idKey!: string;

  /**
   * Field name in the menu item data set that holds item label. Defaults to
   * `'label'`.
   */
  @Prop({ default: 'label' }) labelKey!: string;

  /**
   * Field name in the menu item data set that holds item subtitle. Defaults to
   * `'subtitle'`.
   */
  @Prop({ default: 'subtitle' }) subtitleKey!: string;

  /**
   * Field name in the menu item data set that holds item tool tip. Defaults to
   * `'hint'`.
   */
  @Prop({ default: 'hint' }) hintKey!: string;

  /**
   * Field name in the menu item data set that tells whether the item has a
   * checkbox attached. Defaults to `'checker'`.
   */
  @Prop({ default: 'checker' }) checkerKey!: string;

  /**
   * Field name in the menu item data set that holds item's checkbox is checked.
   * Defaults to `'checked'`.
   */
  @Prop({ default: 'checked' }) checkedKey!: string;

  /**
   * Field name in the menu item data set that holds item keyboard shortcut.
   * Defaults to `'shortcut'`.
   */
  @Prop({ default: 'shortcut' }) shortcutKey!: string;

  /**
   * Field name in the menu item data set that holds sub-menu item. Defaults to
   * `'children'`.
   */
  @Prop({ default: 'children' }) childrenKey!: string;

  /**
   * Menu item data set.
   */
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
    if ('---' == item[this.labelKey]) return;
    this.setState(item);
    evt.data = item;
    /**
     * A menu item has been clicked.
     * @type {G8MenuItemClicked}
     */
    this.$emit('click', evt);
    this.$forceUpdate();
  }
}
</script>
