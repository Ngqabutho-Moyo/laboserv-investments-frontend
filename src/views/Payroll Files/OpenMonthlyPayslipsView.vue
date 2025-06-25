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
      found: false,
      month: '',
      year: 0,
      jsonData: {},
      url: 'http://localhost:5001/api/payslips/period',
    }
  },
  mounted() {
    const date = new Date()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    if (months[date.getMonth()] == 'January') {
      this.month = 'December'
      this.year = date.getFullYear() - 1
    } else {
      this.month = months[date.getMonth() - 1]
      this.year = date.getFullYear()
    }

    const payslipParams = {
      params: {
        month: this.month,
        year: this.year
      }
    }

    // this.month = date.toLocaleString('en-us', { month: 'long' })
    // this.year = date.getFullYear().toString()

    axios.get(this.url, payslipParams).then((response => {
      if (response.status != 404) {
        this.found = true
        console.log(response.data)
        this.jsonData = response.data
      }
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
    <Hero title="Payslips for Last Month" subtitle="Laboserv Investments P/L"></Hero>
  </div>
  <div class="grid grid-cols-3 gap-3 py-12">
    <div></div>
    <!-- <img v-bind:src="'/src/assets/img/laboserv4.png'"> -->
    <div>
      <p><strong>Laboserv Investments P/L</strong></p>
      <p><strong>PAYROLL FOR {{ month.toUpperCase() }} {{ year }}</strong></p>
      <p>Averaged for period: IBR=25.59, NSSA Ceiling=17,912.51</p>
    </div>
    <div></div>
    <!-- <img v-bind:src="'/src/assets/logos/NQ labs.png'" style="width: 50px; height: 50px;"> -->
  </div>
  <div v-if="found == false">
    <h2>
      <center>No data</center>
    </h2>
  </div>
  <div v-else>
    <div class='mb-5' v-for="data in jsonData" :key="data">
      <!-- <center> {{ data['month' as keyof typeof data] }} {{ data['year' as keyof typeof data] }}</center> -->
      <div class="mb-4 grid grid-cols-3 gap-3">
        <img v-bind:src="'/src/assets/img/laboserv4.png'">
        <div>
          <p><strong>Laboserv Investments P/L</strong></p>
          <p>33 Western Road</p>
          <p>Greendale</p>
          <p>Harare</p>
        </div>
        <div>
          <p><strong>Email:&emsp;</strong>info@laboserv.co.zw</p>
          <p><strong>Phone:&emsp;</strong>+2638644297060</p>
          <p><strong>Website:&emsp;</strong> www.laboserv.co.zw </p>
        </div>
      </div>
      <!-- 1st row -->
      <div class="mb-4 grid grid-cols-3 gap-3">
        <p><strong>First Names:</strong> {{ data['firstName' as keyof typeof data] }}</p>
        <p><strong>Surname: </strong> {{ data['surname' as keyof typeof data] }}</p>
        <p><strong>Works #</strong> {{ data['worksNumber' as keyof typeof data] }}</p>
      </div>
      <!-- 2nd row -->
      <div class="mb-4 grid grid-cols-3 gap-3">
        <p><strong>Grade:</strong> {{ data['grade' as keyof typeof data] }}</p>
        <p><strong>Department: </strong> {{ data['department' as keyof typeof data] }}</p>
        <p><strong>ID Number</strong> {{ data['idNumber' as keyof typeof data] }}</p>
      </div>
      <!-- 3rd row -->
      <div class="mb-4 grid grid-cols-3 gap-3">
        <p><strong>Date Joined:</strong> {{ data['dateJoined' as keyof typeof data] }}</p>
        <p><strong>Days Taken: </strong> {{ data['daysTaken' as keyof typeof data] }}</p>
        <p><strong>Leave Balance</strong> {{ data['leaveBalance' as keyof typeof data] }}</p>
      </div>
      <!-- 4th row -->
      <div class="mb-4 grid grid-cols-3 gap-3">
        <p><strong>Loan:</strong> {{ data['loan' as keyof typeof data] }}</p>
        <p><strong>NSSA No: </strong> {{ data['SSNNumber' as keyof typeof data] }}</p>
        <p><strong>Medical Aid No</strong> {{ data['medicalAidNumber' as keyof typeof data] }}</p>
      </div>
      <!-- 5th row -->
      <div class="mb-4 grid grid-cols-3 gap-3">
        <p><strong>Bank: </strong> {{ data['bank' as keyof typeof data] }}</p>
        <p><strong>Branch: </strong> {{ data['branch' as keyof typeof data] }}</p>
        <p><strong>Account No.: </strong> {{ data['accountNumber' as keyof typeof data] }}</p>
      </div>
      <hr>
      <table id="'only-css'">
        <tbody>
          <tr>
            <td>Days 22 @5.91 basic</td>
            <td style="text-align: right">{{ parseFloat(data['basePay' as keyof typeof data]).toFixed(2) }}</td>
            <td style="color: red;">PAYE USD:</td>
            <td style="color: red; text-align: right;">{{ parseFloat(data['payeUSD' as keyof typeof data]).toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td>Housing Allowance USD:</td>
            <td style="text-align:right;">{{ parseFloat(data['housingAllowance' as keyof typeof data]).toFixed(2) }}
            </td>
            <td style="color:red">AIDS Levy USD:</td>
            <td style="color: red; text-align: right;">{{ parseFloat(data['aidsLevyUSD' as keyof typeof
              data]).toFixed(2) }}</td>
          </tr>
          <tr>
            <td>Transport Allowance USD:</td>
            <td style="text-align:right;">{{ parseFloat(data['transportAllowance' as keyof typeof data]).toFixed(2) }}
            </td>
            <td style="color:red">NSSA USD:</td>
            <td style="color:red; text-align: right">{{ parseFloat(data['nssaLevyUSD' as keyof typeof data]).toFixed(2)
            }}</td>
          </tr>
          <tr>
            <td>Commission USD:</td>
            <td style="text-align:right;">{{ parseFloat(data['commission' as keyof typeof data]).toFixed(2) }}</td>
            <td style="color:red"></td>
            <td style="color:red"></td>
          </tr>
          <br>
          <tr>
            <td>Gross USD: (IBR=25.5893)</td>
            <td style="text-align:right;">{{ parseFloat(data['grossPay' as keyof typeof data]).toFixed(2) }}</td>
            <td style="color:red">Total Deductions USD:</td>
            <td style="color:red;text-align: right;">{{ parseFloat(data['totalDeductionsUSD' as keyof typeof
              data]).toFixed(2) }}</td>
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
            <td style="text-align:right;">{{ parseFloat(data['netPayUSD' as keyof typeof data]).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <hr>
      <hr>
    </div>
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
