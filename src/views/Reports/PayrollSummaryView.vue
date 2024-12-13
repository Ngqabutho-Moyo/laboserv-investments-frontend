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
      url: 'http://localhost:5000/api/payrolls/summary',
      wcifUSD: 0.0,
      zimdefUSD: 0.0,
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
    <Hero title="Payroll Summary"></Hero>
  </div>
  <div class="grid grid-cols-3 gap-3 py-12">
    <img v-bind:src="'/src/assets/img/laboserv4.png'">
    <div>
      <p><strong>Laboserv Investments P/L</strong></p>
      <p><strong>PAYROLL SUMMARY FOR PERIOD SINCE JANUARY 2024</strong></p>
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
          <td>{{ jsonData['entries' as keyof typeof jsonData] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['basePay' as keyof typeof jsonData]).toFixed(2) }}</td>
          <td>P.A.Y.E. USD</td>
          <td>{{ jsonData['entries' as keyof typeof jsonData] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['payeUSD' as keyof typeof jsonData]).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Commission USD</td>
          <td>{{ jsonData['entries' as keyof typeof jsonData] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['commission' as keyof typeof jsonData]).toFixed(2) }}
          </td>
          <td>AIDS Levy USD</td>
          <td>{{ jsonData['entries' as keyof typeof jsonData] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['aidsLevyUSD' as keyof typeof jsonData]).toFixed(2) }}
          </td>
        </tr>
        <tr>
          <td>Housing Allowance USD</td>
          <td>{{ jsonData['entries' as keyof typeof jsonData] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['housingAllowance' as keyof typeof jsonData]).toFixed(2)
            }}</td>
          <td>NSSA USD</td>
          <td>{{ jsonData['entries' as keyof typeof jsonData] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['nssaLevyUSD' as keyof typeof jsonData]).toFixed(2) }}
          </td>
          <td>NSSA USD</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['nssaLevyUSD' as keyof typeof jsonData]).toFixed(2) }}
          </td>
        </tr>
        <tr>
          <td>Transport Allowance USD</td>
          <td>{{ jsonData['entries' as keyof typeof jsonData] }}</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['transportAllowance' as keyof typeof
            jsonData]).toFixed(2) }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>WCIF USD</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['WCIF_USD' as keyof typeof jsonData]).toFixed(2) }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Zimdef USD</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['zimdefUSD' as keyof typeof jsonData]).toFixed(2) }}
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Standards Dev Levy USD</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['standardsDevLevy' as keyof typeof jsonData]).toFixed(2)
            }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Stabilization Fund USD</td>
          <td style="text-align: right;">{{ stabilizationFundUSD.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Gross Pay USD</td>
          <td></td>
          <td style="text-align: right;">{{ parseFloat(jsonData['grossPay' as keyof typeof jsonData]).toFixed(2) }}</td>
          <td>Total Deductions USD</td>
          <td></td>
          <td style="text-align: right;">{{ parseFloat(jsonData['totalDeductionsUSD' as keyof typeof
            jsonData]).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Benefits USD 0.00</td>
          <td>Credits USD</td>
          <td style="text-align: right;">0.00</td>
          <td>Nett Pay USD</td>
          <td></td>
          <td style="text-align: right;">{{ parseFloat(jsonData['netPayUSD' as keyof typeof jsonData]).toFixed(2) }}
          </td>
          <td>Total Employer Contr. USD:</td>
          <td style="text-align: right;">{{ parseFloat(jsonData['totalEmployerContr' as keyof typeof
            jsonData]).toFixed(2) }}</td>
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
