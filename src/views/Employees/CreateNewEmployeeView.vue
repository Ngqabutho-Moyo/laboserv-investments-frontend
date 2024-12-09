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
const url = 'http://localhost:5000/api/employees/create'

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
  // pobsContribution: null,
  // basicAPWCS: null,
  actualInsurableEarnings: null
})

const handleSubmit = async () => {
  axios.post(url, form).then(() => {
    toast.success('Employee added successfully!')
    router.push('/')
  }).catch((error) => {
    toast.error('Something went wrong')
    console.log(error.response)
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
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="text" v-model="form.ssrNumber" id="ssrNumber" name="ssrNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="SSR Number" required>
            <input type="text" v-model="form.worksNumber" id="worksNumber" name="worksNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Works Number">
          </div>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="text" v-model="form.ssnNumber" id="ssnNumber" name="ssnNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="SSN Number" required>
            <input type="text" v-model="form.nationalID" id="nationalID" name="nationalID"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
          </div>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="number" v-model="form.period" id="period" name="period"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Period" required>
            <input type="text" onmouseover="(this.type='date')" onmouseleave="(this.type='text')"
              v-model="form.birthDate" id="birthDate" name="birthDate" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Birth Date" required>
          </div>

          <!-- 3rd row -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="text" v-model="form.surname" id="surname" name="surname"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
            <input type="text" v-model="form.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First Name" required>
          </div>

          <!-- 4th row -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="text" onmouseover="(this.type='date')" onmouseleave="(this.type='text')"
              v-model="form.startDate" id="startDate" name="startDate" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Start Date" required>
            <input type="text" onmouseover="(this.type='date')" onmouseleave="(this.type='text')" v-model="form.endDate"
              id="endDate" name="endDate" class="border rounded w-full py-2 px-3 mb-2" placeholder="End Date">
          </div>

          <!-- 5th row -->
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
