<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import { reactive } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import router from '@/router'

defineProps({
  title: {
    type: String,
    default: 'Delete Employee Form'
  }
})

const toast = useToast()
const deleteEmployeeURL = 'http://localhost:5000/api/employee/delete'

const deleteEmployeeForm = reactive({
  firstName: '',
  surname: ''
})


const handleSubmit = async () => {
  const employeeConfig = {
    params: {
      firstName: deleteEmployeeForm['firstName'],
      surname: deleteEmployeeForm['surname']
    }
  }

  axios.delete(deleteEmployeeURL, employeeConfig).then(() => {
    toast.success('Employee deleted successfully!')
    router.push('/')
  }).catch(error => {
    if (error.response.status == 404) {
      toast.warning(`${deleteEmployeeForm['firstName']} ${deleteEmployeeForm['surname']} does not exist`)
    }
  })
}

</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield
}
</style>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <div class="mb-10">
    <Hero title="Delete Employee"></Hero>
  </div>
  <section class="bg-white w-auto mx-60 my-30">
    <div class="container m-auto max-w-4xl">
      <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <!-- Form title -->
          <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="text" v-model="deleteEmployeeForm.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First name" required>
            <input type="text" v-model="deleteEmployeeForm.surname" id="surname" name="surname"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
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
