<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import pdf from '@/assets/pdf/USD-Jan-Dec 2024-Tax-Tables .pdf'

</script>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <div class="mb-10">
    <Hero title="Tax Tables"></Hero>
  </div>
  <center>
    <div>
      <embed style="width: 90vw; height: 100vh;" :src="pdf">
    </div>
  </center>
</template>
