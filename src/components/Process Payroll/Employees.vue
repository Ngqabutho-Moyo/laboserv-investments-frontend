<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import axios from 'axios';

export default {
  components: {
  },

  data() {
    return {
      jsonData: {},
      deductions: {},
      getEmployeesURL: 'http://localhost:5000/api/employees/',
      getDeductionsURL: 'http://localhost:5000/api/employees/deductions'
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
  <table class="mb-10">
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
        <td>{{ data['ssrNumber' as keyof typeof data] }}</td>
        <td>{{ data['worksNumber' as keyof typeof data] }}</td>
        <td>{{ data['ssnNumber' as keyof typeof data] }}</td>
        <td>{{ data['nationalID' as keyof typeof data] }}</td>
        <td>{{ data['period' as keyof typeof data] }}</td>
        <td>{{ data['birthDate' as keyof typeof data] }}</td>
        <td>{{ data['surname' as keyof typeof data] }}</td>
        <td>{{ data['firstName' as keyof typeof data] }}</td>
        <td>{{ data['startDate' as keyof typeof data] }}</td>
        <td>{{ data['endDate' as keyof typeof data] }}</td>
        <td>{{ data['pobsInsurableEarnings' as keyof typeof data] }}</td>
        <td>{{ data['pobsContribution' as keyof typeof data] }}</td>
        <td>{{ data['basicAPWCS' as keyof typeof data] }}</td>
        <td>{{ data['actualInsurableEarnings' as keyof typeof data] }}</td>
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
/* @page {
  size: landscape;
} */

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
