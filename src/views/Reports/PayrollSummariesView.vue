<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import axios from 'axios';
// import { onMounted } from 'vue';

export default {
  components: {
    Navbar,
    Hero
  },
  data() {
    return {
      jsonData: {},
      url: 'http://localhost:5000/api/payrolls/sum',
      wcifUSD: 0.0,
      zimdefUSD: 30.01,
      standardsDevLevyUSD: 0.0,
      stabilizationFundUSD: 0.00,
      totalEmployerContrUSD: 0.00
    }
  },

  mounted() {
    {
      axios.get(this.url).then((response) => {
        this.jsonData = response.data
      }).catch((error) => {
        console.log(error.response)
      })
    }
  }
}

</script>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <div class="mb-5">
    <Hero title="Payroll Summaries"></Hero>
  </div>
  <div class="grid grid-cols-3 gap-3 py-12">
    <img v-bind:src="'/src/assets/img/laboserv4.png'">
    <div>
      <p><strong>Laboserv Investments P/L</strong></p>
      <p><strong>PAYROLL SUMMARY FOR PERIOD FROM 1/10/2024 TO 31/10/2024</strong></p>
      <p>Averaged for period: IBR=25.59, NSSA Ceiling=17,912.51</p>
    </div>
    <!-- <img v-bind:src="'/src/assets/logos/NQ labs.png'" style="width: 50px; height: 50px;"> -->
  </div>
  <div class="mb-40">
    <table>
      <thead>
        <tr>
          <th>TOTAL EARNINGS</th>
          <th>ENTRIES</th>
          <th>&emsp13;</th>
          <th>DEDUCTIONS</th>
          <th>ENTRIES</th>
          <th>&emsp13;</th>
          <th>COMPANY CONTRIBUTIONS</th>
          <th>&emsp13;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Days 88 Basic USD</td>
          <td>{{ jsonData['entries'] }}</td>
          <td style="text-align: right;">{{ jsonData['basePay'] }}</td>
          <td>P.A.Y.E. USD</td>
          <td>{{ jsonData['entries'] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['payeUSD']).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Commission USD</td>
          <td>{{ jsonData['entries'] }}</td>
          <td style="text-align: right;">{{ jsonData['commission'] }}</td>
          <td>AIDS Levy USD</td>
          <td>{{ jsonData['entries'] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['aidsLevyUSD']).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Housing Allowance USD</td>
          <td>{{ jsonData['entries'] }}</td>
          <td style="text-align: right;">{{ jsonData['housingAllowance'] }}</td>
          <td>NSSA USD</td>
          <td>{{ jsonData['entries'] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['nssaLevyUSD']).toFixed(2) }}</td>
          <td>NSSA USD</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['nssaLevyUSD']).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Transport Allowance USD</td>
          <td>{{ jsonData['entries'] }}</td>
          <td style="text-align: right;">{{ jsonData['transportAllowance'] }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>WCIF USD</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['WCIF_USD']).toFixed(2) }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Zimdef USD</td>
          <td style="text-align: right;">{{ zimdefUSD }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Standards Dev Levy USD</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['standardsDevLevy']).toFixed(2) }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Stabilization Fund USD</td>
          <td style="text-align: right;">{{ parseFloat(stabilizationFundUSD).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Gross Pay USD</td>
          <td></td>
          <td style="text-align: right;">{{ jsonData['grossPay'] }}</td>
          <td>Total Deductions USD</td>
          <td></td>
          <td style="text-align: right;">{{ parseFloat(jsonData['totalDeductionsUSD']).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Benefits USD 0.00</td>
          <td>Credits USD</td>
          <td style="text-align: right;">0.00</td>
          <td>Nett Pay USD</td>
          <td></td>
          <td style="text-align: right;">{{ parseFloat(jsonData['netPayUSD']).toFixed(2) }}</td>
          <td>Total Employer Contr. USD:</td>
          <td style="text-align: right;">{{ parseFloat(parseFloat(jsonData['nssaLevyUSD']) +
            parseFloat(jsonData['WCIF_USD']) +
            zimdefUSD +
            parseFloat(jsonData['standardsDevLevy']) + stabilizationFundUSD).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
th,
td {
  padding-right: 1.25%
}
</style>
