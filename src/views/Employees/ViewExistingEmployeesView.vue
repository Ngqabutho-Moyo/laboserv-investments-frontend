<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import axios from 'axios';

export default {
  components: {
    Navbar,
    Hero
  },

  data() {
    return {
      jsonData: {},
      url: 'http://localhost:5000/api/employees/'
    }
  },

  mounted() {
    axios.get(this.url).then((response) => {
      this.jsonData = response.data
    }).catch((error) => {
      console.log(error.response)
    })
  }
}
</script>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <div class="mb-10">
    <Hero title="Employees"></Hero>
  </div>
  <table class="mt-25">
    <thead>
      <tr>
        <th>SSRNumber</th>
        <th>WorksNumber</th>
        <th>SSNNumber</th>
        <th>NationalID</th>
        <th>Period</th>
        <th>BirthDate</th>
        <th>Surname</th>
        <th>Firstname</th>
        <th>StartDate</th>
        <th>EndDate</th>
        <th>POBSInsurableEarnings</th>
        <th>POBSContribution</th>
        <th>BasicAPWCS</th>
        <th>ActualInsurableEarnings</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in jsonData" :key="data">
        <td>{{ data['ssrNumber'] }}</td>
        <td>{{ data['worksNumber'] }}</td>
        <td>{{ data['ssnNumber'] }}</td>
        <td>{{ data['nationalID'] }}</td>
        <td>{{ data['period'] }}</td>
        <td>{{ data['birthDate'] }}</td>
        <td>{{ data['surname'] }}</td>
        <td>{{ data['firstName'] }}</td>
        <td>{{ data['startDate'] }}</td>
        <td>{{ data['endDate'] }}</td>
        <td>{{ data['pobsInsurableEarnings'] }}</td>
        <td>{{ data['pobsContribution'] }}</td>
        <td>{{ data['basicAPWCS'] }}</td>
        <td>{{ data['actualInsurableEarnings'] }}</td>
      </tr>
    </tbody>
  </table>
  <!-- </div> -->
</template>

<style>
table {
  width: 100%;
}

th {
  text-align: left;
}

table,
th,
tbody,
td {
  border: px solid black;
  /* padding-right: 1.25%;
  padding-left: 1.25%; */
}
</style>

<!-- <style>
th,
td {
  padding-right: 1.25%
}
</style> -->
