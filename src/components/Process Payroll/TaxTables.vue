<script setup lang="ts">
import pdf from '@/assets/pdf/USD-Jan-Dec 2024-Tax-Tables .pdf'

</script>

<template>
  <center>
    <div>
      <embed style="width: 90vw; height: 100vh;" :src="pdf">
    </div>
  </center>
</template>
