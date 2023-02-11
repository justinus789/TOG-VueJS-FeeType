<template>
  <v-app>
    <default-drawer />

    <div id="app-bar">
      <default-bar />
    </div>

    <default-view class="my-8 mx-2" />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultDrawer from './NavDrawer.vue'
</script>
