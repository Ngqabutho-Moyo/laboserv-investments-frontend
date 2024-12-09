<script lang="ts">
import axios from 'axios';
import Hero from '@/components/Hero.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Hero,
    Navbar,
  },
  data() {
    return {
      items: '',
      url: 'http://localhost:5000/api/payrolls/'
    }
  },
  mounted() {
    axios.get(this.url).then((response) => {
      this.items = response.data
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<template>
  <div>Data from API</div>
  <Hero></Hero>
  <Navbar></Navbar>
  <center>Testing APIs</center>
  <p>{{ items }}</p>
  <hr>
  <p>{{ items[0]['firstName'] }}</p>
</template>
