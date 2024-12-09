<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
</script>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <div>
    <Hero title="Home"></Hero>
    <section class="bg-center bg-no-repeat h-screen bg-contain "
      style="background-image: url('src/assets/img/laboserv3.png');">
    </section>
  </div>
</template>
