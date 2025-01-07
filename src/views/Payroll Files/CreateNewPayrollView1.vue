<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification'
import router from '@/router';

defineProps({
  title: {
    type: String,
    default: 'Payroll Form'
  }
})

const toast = useToast()
const createPayrollURL = 'http://localhost:5000/api/payrolls/create'
const getEmployeeURL = 'http://localhost:5000/api/employee'
const getPayrollURL = 'http://localhost:5000/api/payroll'

const form = reactive({
  month: 'Month',
  year: null,
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
});


const handleSubmit = async () => {
  /**Before we create a new payroll, we need to validate 2 things:
   * 1. Does the employee exist in the employees table?
   * 2. Has the payroll for that moth and year already been created?
   */
  const getEmployeeParams = {
    params: {
      firstName: form['firstName'],
      surname: form['surname']
    }
  }

  const getPayrollParams = {
    params: {
      idNumber: form['idNumber'],
      firstName: form['firstName'],
      surname: form['surname'],
      month: form['month'],
      year: form['year']

    }
  }

  // Does the payslip already exist?
  axios.get(getPayrollURL, getPayrollParams).then(response => {
    const jsonData = response.data
    console.log(jsonData)
    if (!jsonData) {
      // Does the employee exist in the employees table?
      axios.get(getEmployeeURL, getEmployeeParams).then(response => {
        const jsonData = response.data
        if (response.status == 200) {
          if (form['idNumber'] == jsonData['nationalID']) {
            if (form['firstName'] == jsonData['firstName'] && form['surname'] == jsonData['surname']) {
              // Do the payslip details match those in the employee table?
              if (form['NSSANumber'] == jsonData['ssnNumber'] && form['dateJoined'] == jsonData['startDate'] && form['basePay'] == jsonData['pobsInsurableEarnings']) {
                // Create the payslip
                axios.post(createPayrollURL, form).then(() => {
                  toast.success('Payslip created successfully!')
                  router.push('/')
                }).catch(error => {
                  toast.error('Failed to create the payslip')
                  console.log(error.response.data)
                })
              } else {
                toast.warning('One of NSSA number, date joined or base pay does not match what is in the employee table')
              }
            } else {
              toast.warning(`${form['firstName']} ${form['surname']} does not exist in the employee table`)
            }
          }
          else {
            toast.warning(`Employee with ID ${form['idNumber']} does not exist`)
          }
        }
        else {
          toast.error(`${form['firstName']} ${form['surname']} does not exist in the employees table`)
        }
      }).catch(error => {
        if (error.response.status == 404) {
          toast.warning(`${form['firstName']} ${form['surname']} does not exist in the employees table`)
        }
        console.log(error.response.data)
      })
    }
    else {
      toast.warning(`Payslip for ${form['firstName']} ${form['surname']} for ${form['month']} ${form['year']} already exists`)
    }
  }).catch(error => {
    if (error.response.status == 404) {
      console.log('Create the payslip')
    } else {
      console.log(error.response.data)
    }
  })
}
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
  <section class="bg-white w-auto mx-60 my-30">
    <div class="container m-auto max-w-4xl">
      <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <!-- Form title -->
          <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>

          <!-- Month and year -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <select v-model="form.month" id="month" name="month" class="border rounded w-full py-2 px-3" required>
              <option value="Month"> Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May"> May</option>
              <option value="June"> June</option>
              <option value="July"> July</option>
              <option value="August">August</option>
              <option value="September"> September</option>
              <option value="October"> October</option>
              <option value="November"> November</option>
              <option value="December"> December</option>
            </select>
            <input type="text" v-model="form.year" id="year" name="year" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Year" required>
          </div>

          <!-- 1st row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First name" required>
            <input type="text" v-model="form.surname" id="surname" name="surname"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Last name" required>
            <input type="text" v-model="form.worksNumber" id="worksNumber" name="worksNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Works #">
          </div>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.grade" id="grade" name="grade" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Grade">
            <input type="text" v-model="form.department" id="department" name="department"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Department" required>
            <input type="text" v-model="form.idNumber" id="idNumber" name="idNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="ID number" required>
          </div>

          <!-- 3rd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.dateJoined" id="dateJoined" name="dateJoined"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Date joined (yyyy-mm-dd)" required>
            <input type="number" v-model="form.daysTaken" id="daysTaken" name="daysTaken"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Days taken" required>
            <input type="number" v-model="form.leaveBalance" id="leaveBalance" name="leaveBalance"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Leave balance" required>
          </div>

          <!-- 4th row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="number" v-model="form.loan" id="loan" name="loan" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Loan" required>
            <input type="text" v-model="form.NSSANumber" id="NSSANumber" name="NSSANumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="NSSA Number" required>
            <input type="text" v-model="form.medicalAidNumber" id="medicalAidNumber" name="medicalAidNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Medical aid #">
          </div>

          <!-- 5th row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <select v-model="form.bank" id="bank" name="bank" class="border rounded w-full py-2 px-3" required>
              <option value="Bank"> Bank</option>
              <option value="AgriculturalDevelopmentBankOfZimbabwe"> Agricultural Development Bank of Zimbabwe</option>
              <option value="BancABC"> BancABC</option>
              <option value="Cabs"> Cabs</option>
              <option value="CBZ"> CBZ</option>
              <option value="FirstCapital"> First Capital</option>
              <option value="Ecobank"> Ecobank</option>
              <option value="FBC"> FBC</option>
              <option value="Nedbank"> Nedbank</option>
              <option value="Metbank"> Metbank</option>
              <option value="NMB"> NMB</option>
              <option value="Stanbic"> Stanbic</option>
              <option value="FBCCrownBank"> FBCCrownBank</option>
              <option value="StewardBank"> Steward Bank</option>
              <option value="ZB"> ZB</option>
              <option value="POSB"> POSB</option>
            </select>
            <input type="text" v-model="form.branch" id="branch" name="branch"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Branch" required>
            <input type="text" v-model="form.accountNumber" id="accountNumber" name="accountNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Account number" required>
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
            <button
              class="bg-sky-300 hover:bg-sky-600 text-white font-bold py-4 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
