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
const deletePayrollURL = 'http://localhost:5000/api/payroll/delete'
// const putEmployeeURL = 'http://localhost:5000/api/employee/update'
const getEmployeesURL = 'http://localhost:5000/api/employees'
const getEmployeeURL = 'http://localhost:5000/api/employee'
// const putPayrollURL = 'http://localhost:5000/api/payroll/update'
// const getPayrollURL = 'http://localhost:5000/api/payroll'
const getPayrollsURL = 'http://localhost:5000/api/payrolls'


const deleteEmployeeForm = reactive({
  nationalID: '',
  // firstName: null,
  // surname: null
  // actualInsurableEarnings: '',
})
let payrollToDelete: object
// let employeeToDelete: object | undefined = {}

const handleSubmit = async () => {
  // const nationalID = deleteEmployeeForm['nationalID']
  // const firstName = deleteEmployeeForm['firstName']
  // const surname = deleteEmployeeForm['surname']
  // const actualInsurableEarnings = parseFloat(deleteEmployeeForm['actualInsurableEarnings'])
  const config = {
    data: {
      nationalID: deleteEmployeeForm['nationalID'],
    }
  }

  axios.delete(deleteEmployeeURL, config).then(() => {
    toast.success('Employee deleted successfully!')
  }).catch(error => {
    toast.error('Failed to delete employee')
    console.log(error.response)
  })

  // // Delete employee from payrolls table (if they exist)
  axios.get(getPayrollsURL).then(response => {
    const jsonData = response.data
    let i = 0
    // let nationalID: string
    let payrollExists: boolean | undefined = false

    while (i < jsonData.length) {
      if (jsonData[i]['idNumber'] == deleteEmployeeForm['nationalID']) {
        payrollExists = true
      }
      i++
    }

    payrollToDelete = {
      idNumber: deleteEmployeeForm['nationalID']
    }

    if (payrollExists == true) {
      axios.delete(deletePayrollURL, payrollToDelete).then(() => {
        toast.success('Payroll deleted successfully!')
      }).catch(error => {
        toast.error('Something went wrong here')
        console.log(error)
      })
    } else {
      toast.info(`${deleteEmployeeForm['nationalID']} did not have a payslip`)
    }
  }).catch((error) => {
    toast.error('Something went wrong')
    console.log(error.response.status)
    // toast.info(`Employee with ID ${nationalID} did not have a payslip`)
  })
  // firstName: firstName,
  // surname: surname
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
          <div class="mb-4">
            <input type="text" v-model="deleteEmployeeForm.nationalID" id="nationalID" name="nationalID"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
            <!-- <input type="text" v-model="deleteEmployeeForm.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First name" required>
            <input type="text" v-model="deleteEmployeeForm.surname" id="surname" name="surname"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required> -->
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
