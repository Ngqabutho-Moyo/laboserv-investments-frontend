<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import router from '@/router';

export default {
  name: 'CreateNewPayslipView',
  components: {
    Navbar
  },
  props: {
    title: {
      type: String,
      default: 'Payslip'
    }
  },
  data() {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const year = date.getFullYear();
    return {
      months: months,
      years: [(year - 1).toString(), year.toString(), (year + 1).toString(), (year + 2).toString(), (year + 3).toString(), (year + 4).toString(), (year + 5).toString()],
      found: false,
      jsonData: {},
      payslipData: {},
      toast: useToast(),
      createPayslipURL: 'http://localhost:5001/api/payslips/create',
      getEmployeeURL: 'http://localhost:5001/api/employee',
      putEmployeeURL: 'http://localhost:5001/api/employee/update',
      getPayslipURL: 'http://localhost:5001/api/payslip',
      autocompleteForm: reactive({
        firstName: null,
        surname: null,
      }),
      form: reactive({
        month: months[date.getMonth()],
        year: year.toString(),
        firstName: null,
        surname: null,
        worksNumber: null,
        grade: null,
        department: null,
        idNumber: null,
        dateJoined: null,
        daysTaken: null,
        leaveBalance: null,
        loan: null,
        NSSANumber: null,
        medicalAidNumber: null,
        bank: 'Bank',
        branch: null,
        accountNumber: null,
        basePay: null,
        housingAllowance: null,
        transportAllowance: null,
        commission: null,
      })
    };
  },
  methods: {
    async autocomplete() {
      const getEmployeeParams = {
        params: {
          firstName: this.autocompleteForm.firstName,
          surname: this.autocompleteForm.surname
        }
      };

      axios.get(this.getEmployeeURL, getEmployeeParams).then(response => {
        this.jsonData = response.data
        if (this.jsonData) {
          this.found = true
          console.log(this.jsonData)
        }
      }).catch(error => {
        if (error.response.status == 404) {
          this.toast.warning(`${this.autocompleteForm['firstName']} ${this.autocompleteForm['surname']} does not exist`)
        }
        else {
          this.toast.error('Failed to fetch employee data')
          console.log(error.response.data)
        }
      })
    },
    async handleSubmit() {
      const payslipForm = {
        month: this.form['month'],
        year: this.form['year'],
        firstName: this.jsonData['firstName' as keyof typeof this.jsonData],
        surname: this.jsonData['surname' as keyof typeof this.jsonData],
        worksNumber: this.jsonData['worksNumber' as keyof typeof this.jsonData],
        grade: this.form['grade'],
        department: this.jsonData['department' as keyof typeof this.jsonData],
        idNumber: this.jsonData['nationalID' as keyof typeof this.jsonData],
        dateJoined: this.jsonData['startDate' as keyof typeof this.jsonData],
        daysTaken: this.form['daysTaken'],
        leaveBalance: this.form['leaveBalance'],
        loan: this.form['loan'],
        nssaNumber: this.jsonData['ssnNumber' as keyof typeof this.jsonData],
        medicalAidNumber: this.jsonData['medicalAidNumber' as keyof typeof this.jsonData],
        bank: this.jsonData['bank' as keyof typeof this.jsonData],
        branch: this.jsonData['branch' as keyof typeof this.jsonData],
        accountNumber: this.jsonData['accountNumber' as keyof typeof this.jsonData],
        basePay: this.form['basePay'],
        housingAllowance: this.form['housingAllowance'],
        transportAllowance: this.form['transportAllowance'],
        commission: this.form['commission']
      }

      const getPayslipParams = {
        params: {
          idNumber: this.jsonData['nationalID' as keyof typeof this.jsonData],
          firstName: this.jsonData['firstName' as keyof typeof this.jsonData],
          surname: this.jsonData['surname' as keyof typeof this.jsonData],
          month: this.form['month'],
          year: this.form['year']
        }
      };

      const putEmployeeParams = {
        firstName: payslipForm.firstName,
        surname: payslipForm.surname,
        pobsInsurableEarnings: payslipForm.basePay,
        actualInsurableEarnings: payslipForm.basePay
      }

      // Have all the fields been filled in?
      if (payslipForm.month != null || payslipForm.year != null || payslipForm.grade != null || payslipForm.daysTaken != null || payslipForm.leaveBalance != null || payslipForm.loan != null || payslipForm.basePay != null || payslipForm.housingAllowance != null || payslipForm.transportAllowance != null || payslipForm.commission != null) {
        // Does the payslip for that month and year for the given employee exist?
        axios.get(this.getPayslipURL, getPayslipParams).then(response => {
          this.payslipData = response.data
          if (!this.payslipData) {
            console.log('Create payslip')
            // Create the payslip
            console.log(payslipForm)
            axios.post(this.createPayslipURL, payslipForm).then(() => {
              this.toast.success('Payslip created successfully!')
              router.push('/')
            }).catch(error => {
              this.toast.error('Failed to create the payslip')
              console.log(error.response.data)
            })

            // Update base pay (if necessary)
            if (this.form['basePay'] != this.jsonData['pobsInsurableEarnings' as keyof typeof this.jsonData]) {
              console.log(`Base pay:\t${this.form['basePay']}\nEarnings:\t${this.jsonData['pobsInsurableEarnings' as keyof typeof this.jsonData]}`)
              axios.put(this.putEmployeeURL, putEmployeeParams).then(() => {
                this.toast.info('Base pay has been updated')
                // router.push('/')
              }).catch(error => {
                this.toast.error('Failed to update base pay')
                console.log(error.response.data)
              })
            }
          }
          else {
            this.toast.warning(`Payslip for ${this.jsonData['firstName' as keyof typeof this.jsonData]} ${this.jsonData['surname' as keyof typeof this.jsonData]} for ${this.form['month']} ${this.form['year']} already exists`)
          }
        }).catch(error => {
          console.log(error.response.data)
        })
      } else {
        this.toast.warning('Fill in all fields')
      }
    }
  }
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <section class="bg-white w-auto mx-60 my-30 py-15">
    <div class="mb-10 container m-auto max-w-4xl">
      <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="autocomplete">
          <h2 class="text-3l text-center font-semibold mb-6">Payslip Autocomplete Form</h2>
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="text" v-model="autocompleteForm.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First name" required>
            <input type="text" v-model="autocompleteForm.surname" id="surname" name="surname"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Last name" required>
          </div>
          <div>
            <button
              class="bg-sky-300 hover:bg-sky-600 text-white font-bold py-4 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">Search</button>
          </div>
        </form>
      </div>
      <div v-if="found == true" class="bg-white px-12 py-8 mb-8 mt-5 shadow-md rounded-md border m-4 md:m-0">
        <div>
          <!-- Form title -->
          <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>

          <!-- Month and year -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <select v-model="form.month" id="month" name="month" class="border rounded w-full py-2 px-3" required>
              <option v-for="month in months" :key="month">{{ month }}</option>
            </select>
            <select v-model="form.year" id="year" name="year" class="border rounded w-full py-2 px-3">
              <option v-for="year in years" :key="year">{{ year }}</option>
            </select>
          </div>

          <!-- 1st row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <output>{{ jsonData['firstName' as keyof typeof jsonData]
            }}</output>
            <output>{{ jsonData['surname' as keyof typeof jsonData] }}</output>
            <output>{{ jsonData['worksNumber' as keyof typeof jsonData] }}</output>
          </div>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.grade" id="grade" name="grade" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Grade">
            <output>{{ jsonData['department' as keyof typeof jsonData] }}</output>
            <output>{{ jsonData['nationalID' as keyof typeof jsonData] }}</output>
          </div>

          <!-- 3rd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <output>{{ jsonData['startDate' as keyof typeof jsonData] }}</output>
            <input type="number" v-model="form.daysTaken" id="daysTaken" name="daysTaken"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Days taken" required>
            <input type="number" v-model="form.leaveBalance" id="leaveBalance" name="leaveBalance"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Leave balance" required>
          </div>

          <!-- 4th row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="number" v-model="form.loan" id="loan" name="loan" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Loan" required>
            <output>{{ jsonData['ssnNumber' as keyof typeof jsonData] }}</output>
            <output>{{ jsonData['medicalAidNumber' as keyof typeof jsonData] }}</output>
          </div>

          <!-- 5th row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <output>{{ jsonData['bank' as keyof typeof jsonData] }}</output>
            <output>{{ jsonData['branch' as keyof typeof jsonData] }}</output>
            <output>{{ jsonData['accountNumber' as keyof typeof jsonData] }}</output>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="number" step=".01" v-model="form.basePay" id="basePay" name="basePay"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Base pay" required>
            <input type="number" v-model="form.housingAllowance" id="housingAllowance" name="housingAllowance"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Housing allowance" required>
            <input type="number" v-model="form.transportAllowance" id="transportAllowance" name="transportAllowance"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Transport allowance" required>
            <input type="number" v-model="form.commission" id="commission" name="commission"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Commission" required>
          </div>
          <div>
            <button @click="handleSubmit"
              class="bg-sky-300 hover:bg-sky-600 text-white font-bold py-4 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">Submit</button>
          </div>
        </div>
      </div>
      <div v-else class="mb-10 mt-5">
        <center>
          <p>No data</p>
        </center>
      </div>
    </div>
  </section>
</template>
