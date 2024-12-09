<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import axios from 'axios'

export default {
  components: {
    Navbar,
    Hero
  },
  data() {
    return {
      jsonData: '',
      url: 'http://localhost:5000/api/payrolls'
    }
  },
  mounted() {
    axios.get(this.url).then((response => {
      console.log(response.data)
      this.jsonData = response.data
    })).catch(error => {
      console.log(error.response)
    })
  }
};
</script>

<template>
  <div class="mb-10">
    <Navbar />
  </div>
  <div class="mb-10">
    <Hero title="Existing Payroll" subtitle="Laboserv Investments P/L"></Hero>
  </div>
  <div class="mt-15 grid grid-cols-3 gap-3">
    <!-- Logo and address -->
    <img v-bind:src="'/src/assets/img/laboserv4.png'">
    <div>
      <p><strong>Laboserv Investments P/L</strong></p>
      <p>33 Western Road</p>
      <p>Greendale</p>
      <p>Harare</p>
    </div>
  </div>
  <div class='mt-10' v-for="data in jsonData" :key="data">
    <!-- 1st row -->
    <div class="mb-4 grid grid-cols-3 gap-3">
      <p><strong>First Names:</strong> {{ data['firstName'] }}</p>
      <p><strong>Surname: </strong> {{ data['surname'] }}</p>
      <p><strong>Works #</strong> {{ data['worksNumber'] }}</p>
    </div>
    <!-- 2nd row -->
    <div class="mb-4 grid grid-cols-3 gap-3">
      <p><strong>Grade:</strong> {{ data['grade'] }}</p>
      <p><strong>Department: </strong> {{ data['department'] }}</p>
      <p><strong>ID Number</strong> {{ data['idNumber'] }}</p>
    </div>
    <!-- 3rd row -->
    <div class="mb-4 grid grid-cols-3 gap-3">
      <p><strong>Date Joined:</strong> {{ data['dateJoined'] }}</p>
      <p><strong>Days Taken: </strong> {{ data['daysTaken'] }}</p>
      <p><strong>Leave Balance</strong> {{ data['leaveBalance'] }}</p>
    </div>
    <!-- 4th row -->
    <div class="mb-4 grid grid-cols-3 gap-3">
      <p><strong>Loan:</strong> {{ data['loan'] }}</p>
      <p><strong>NSSA No: </strong> {{ data['nssaNumber'] }}</p>
      <p><strong>Medical Aid No</strong> {{ data['medicalAidNumber'] }}</p>
    </div>
    <!-- 5th row -->
    <div class="mb-4 grid grid-cols-3 gap-3">
      <p><strong>Bank: </strong> {{ data['bank'] }}</p>
      <p><strong>Branch: </strong> {{ data['branch'] }}</p>
      <p><strong>Account No.: </strong> {{ data['accountNumber'] }}</p>
    </div>
    <hr>
    <table>
      <tbody>
        <tr>
          <td>Days 22 @5.91 basic</td>
          <td>{{ data['basePay'] }}</td>
          <td style="color: red;">PAYE USD:</td>
          <td style="color: red;">{{ data['payeUSD'] }}</td>
        </tr>
        <tr>
          <td>Housing Allowance USD:</td>
          <td>{{ data['basePay'] }}</td>
          <td style="color:red">AIDS Levy USD:</td>
          <td style="color: red;">{{ data['aidsLevyUSD'] }}</td>
        </tr>
        <tr>
          <td>Transport Allowance USD:</td>
          <td>{{ data['transportAllowance'] }}</td>
          <td style="color:red">NSSA USD:</td>
          <td style="color:red">{{ data['nssaLevyUSD'] }}</td>
        </tr>
        <tr>
          <td>Commission USD:</td>
          <td>{{ data['commission'] }}</td>
          <td style="color:red"></td>
          <td style="color:red"></td>
        </tr>
        <br>
        <tr>
          <td>Gross USD: (IBR=25.5893)</td>
          <td>{{ data['grossPay'] }}</td>
          <td style="color:red">Total Deductions USD:</td>
          <td style="color:red">{{ data['totalDeductionsUSD'] }}</td>
        </tr>
        <tr>
          <td>NSSA Ceiling=17,912.51</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Nett Pay USD:</td>
          <td>{{ data['netPayUSD'] }}</td>
        </tr>
      </tbody>
    </table>
    <hr>
    <hr>
    <hr>
  </div>
</template>

<style>
table {
  width: 100%;
}

td {
  text-align: left;
}
</style>
