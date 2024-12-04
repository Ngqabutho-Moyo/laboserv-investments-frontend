<!-- eslint-disable vue/block-lang -->
<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app"></div>
  <header>
    <Navbar></Navbar>
    <RouterView></RouterView>
  </header>
</template>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  width: 100vw;
  padding: 15px;
}
</style>
