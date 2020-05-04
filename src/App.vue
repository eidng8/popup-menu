<!--
  - GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
  -
  - Author: eidng8
  -->

<template>
  <div id="app" :class="{ dark }">
    <div>
      <label>Dark theme</label>
      <input type="checkbox" v-model="dark" />
    </div>
    <g8-popup-menu
      class="g8-menu"
      :items="items"
      :class="{ 'g8--dark': dark }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { G8MenuItem, G8PopupMenu } from '.';

@Component({ components: { G8PopupMenu } })
export default class App extends Vue {
  items!: G8MenuItem[];

  dark = true;

  // noinspection JSUnusedGlobalSymbols
  created(): void {
    this.items = this.generateItems(5, '', true);
    this.items[1].children = this.generateItems(5, '1.');
  }

  generateItems(num: number, prefix = '', checker = false): G8MenuItem[] {
    const items = [] as G8MenuItem[];
    for (let idx = 0; idx < num; idx++) {
      items.push({
        label: `item ${prefix}${idx}`,
        subtitle: `subtitle ${prefix}${idx}`,
        hint: `hint ${prefix}${idx}`,
        checker: checker && !(idx % 3),
        shortcutKey: String.fromCharCode(97 + idx),
      });
    }
    return items;
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

hr {
  height: 1px;
  width: 100%;
  border-width: 0 0 1px;
  border-color: rgba(0.5, 0.5, 0.5, 0.5);
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &.dark {
    color: #888;
    background: #333333;
  }
}
</style>
