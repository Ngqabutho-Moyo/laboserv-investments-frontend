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
const getEmployeesURL = 'http://localhost:5000/api/employees'

const form = reactive({
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
  nssaNumber: null,
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
  const idNumber = form['idNumber']
  let nationalID: string
  // let basePay: number

  axios.get(getEmployeesURL).then(response => {
    const jsonData = response.data
    let i = 0

    while (i < jsonData.length) {
      if (jsonData[i]['nationalID'] == idNumber) {
        nationalID = jsonData[i]['nationalID']
        // basePay = parseFloat(jsonData[i]['actualInsurableEarnings'])
      }
      i++
    }

    if (nationalID != null) {
      axios.post(createPayrollURL, form).then(() => {
        toast.success('Payroll was added successfully!')
        router.push('/')
      }).catch((error) => {
        console.log(error)
        toast.error('Something went wrong')
      })
    } else {
      toast.warning(`Employee with id ${idNumber} does not exist`)
    }
  }).catch(error => {
    console.log(error)
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
            <input type="text" onmouseover="(this.type='date')" onmouseleave="(this.type='text')"
              v-model="form.dateJoined" id="dateJoined" name="dateJoined" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Date joined" required>
            <input type="number" v-model="form.daysTaken" id="daysTaken" name="daysTaken"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Days taken" required>
            <input type="number" v-model="form.leaveBalance" id="leaveBalance" name="leaveBalance"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Leave balance" required>
          </div>

          <!-- 4th row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="number" v-model="form.loan" id="loan" name="loan" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Loan" required>
            <input type="text" v-model="form.nssaNumber" id="nssaNumber" name="nssaNumber"
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

            <input type="number" v-model="form.basePay" id="basePay" name="basePay"
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
