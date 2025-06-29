<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import router from '@/router';

defineProps({
  title: {
    type: String,
    default: 'Employee Form'
  }
})

const toast = useToast()
const postEmployeeURL = 'http://localhost:5001/api/employees/create'
const banks = ['Bank', 'Agricultural Development Bank of Zimbabwe', 'BancABC', 'Cabs', 'CBZ', 'First Capital', 'Ecobank', 'FBC', 'Nedbank',
  'Metbank', 'NMB', 'Stanbic', 'FBCCrownBank', 'Steward Bank', 'ZB', 'POSB',]
const departments = ['Department', 'Technical', 'Management', 'Administration']

const form = reactive({
  ssrNumber: null,
  worksNumber: null,
  ssnNumber: null,
  nationalID: null,
  period: null,
  birthDate: null,
  surname: null,
  firstName: null,
  startDate: null,
  endDate: null,
  pobsInsurableEarnings: null,
  actualInsurableEarnings: null,
  department: departments[0],
  bank: banks[0],
  branch: null,
  accountNumber: null,
  medicalAidNumber: null,
})

const handleSubmit = async () => {
  // Do all the fields make sense?
  if (form['bank'] != 'Bank' || form['department'] != 'Department') {
    // Do the insurable arnings match?
    if (form['pobsInsurableEarnings'] == form['actualInsurableEarnings']) {
      // Create the employee
      console.log(form)
      axios.post(postEmployeeURL, form).then(() => {
        toast.success('Employee created successfully!')
        router.push('/')
      }).catch(error => {
        if (error.response.status == 409) {
          toast.warning(`Employee with national ID ${form['nationalID']} already exists`)
        }
      })
    } else {
      toast.warning('Insurable earnings do not match')
    }
  } else {
    toast.warning('Enter a valid bank and department')
  }
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
  <div class="mb-10">
    <Hero title="Create New Employee"></Hero>
  </div>
  <section class="bg-white w-auto mx-60 my-30">
    <div class="container m-auto max-w-4xl">
      <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <!-- Form title -->
          <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>

          <!-- 1st row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.ssrNumber" id="ssrNumber" name="ssrNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="SSR Number" required>
            <input type="text" v-model="form.worksNumber" id="worksNumber" name="worksNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Works Number">
            <input type="text" v-model="form.ssnNumber" id="ssnNumber" name="ssnNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="SSN Number" required>
          </div>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.medicalAidNumber" id="medicalAidNumber" name="medicalAidNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Medical Aid #" required>
            <input type="text" v-model="form.nationalID" id="nationalID" name="nationalID"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
            <input type="number" v-model="form.period" id="period" name="period"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Period" required>
          </div>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.birthDate" id="birthDate" name="birthDate"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Birth Date (yyyy-mm-dd)" required>
            <input type="text" v-model="form.surname" id="surname" name="surname"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
            <input type="text" v-model="form.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First Name" required>
          </div>

          <!-- 3rd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.startDate" id="startDate" name="startDate"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Start Date (yyyy-mm-dd)" required>
            <input type="text" v-model="form.endDate" id="endDate" name="endDate"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="End Date (yyyy-mm-dd)">
            <select v-model="form.department" id="department" name="department" class="border rounded w-full py-2 px-3">
              <option v-for="dept in departments" :key="dept">{{ dept }}</option>
            </select>
          </div>

          <!-- 6th row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <select v-model="form.bank" id="bank" name="bank" class="border rounded w-full py-2 px-3">
              <option v-for="bank in banks" :key="bank">{{ bank }}</option>
            </select>
            <input type="text" v-model="form.branch" id="branch" name="branch"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Branch" required>
            <input type="text" v-model="form.accountNumber" id="accountNumber" name="accountNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Account Number" required>
          </div>

          <!-- 7th row -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="number" v-model="form.pobsInsurableEarnings" id="pobsInsurableEarnings"
              name="pobsInsurableEarnings" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="POBS Insurable Earnings" required>
            <input type="number" v-model="form.actualInsurableEarnings" id="actualInsurableEarnings"
              name="actualInsurableEarnings" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Actual Insurable Earnings" required>
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
