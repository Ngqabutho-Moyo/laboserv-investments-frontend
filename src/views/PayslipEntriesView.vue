<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import axios from 'axios'
import { onMounted } from 'vue';

const url = 'http://localhost:5000/api/payrolls/'
let x: string

onMounted(() => {
  axios.get(url).then((response) => {
    console.log(response.data)
    x = response.data
  }).catch((error) => {
    console.log(error)
  })
})

</script>

<template>
  <div class="mb-10">
    <Navbar />
  </div>
  <Hero title="Payslip Entries"></Hero>
  <!-- <button @onclick="test">Test</button> -->
  <p>{{ x }}</p>
  <!-- <p>{{ test() }}</p> -->

</template>

<!-- <script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import axios from 'axios'

export default {
  data() {
    return {
      jsonData: '',
      url: 'http://localhost:5000/api/payrolls'
    }
  },
  mounted() {
    axios.get(this.url).then((response => {
      this.jsonData = response.data
    })).catch(error => {
      console.log(error)
    })
  }
};
</script> -->
