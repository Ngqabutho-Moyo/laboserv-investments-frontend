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
      deductions: {},
      getEmployeeURL: 'http://localhost:5001/api/payroll/',
      getEmployeesURL: 'http://localhost:5001/api/employees/',
      getDeductionsURL: 'http://localhost:5001/api/employees/deductions'
    }
  },

  mounted() {
    axios.get(this.getEmployeesURL).then((response) => {
      this.jsonData = response.data
    }).catch((error) => {
      console.log(error.response)
    })

    axios.get(this.getDeductionsURL).then(response => {
      this.deductions = response.data
    }).catch(error => {
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
      <tr>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
        <td>&emsp13;</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>total</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{{ deductions['pobsContribution' as keyof typeof deductions] }}</td>
        <td>{{ deductions['basicAWPCS' as keyof typeof deductions] }}</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <p>Total NSSA PAYABLE</p>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td><strong>{{ deductions['totalNSSAPayable' as keyof typeof deductions] }}</strong></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <!-- <p>{{ deductions }}</p> -->
</template>

<style>
table {
  width: 100%;
  font-size: small;
  padding: 0%;
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
