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
    default: 'Update Employee Form'
  }
})

const toast = useToast()
const putEmployeeURL = 'http://localhost:5000/api/employee/update'
// const getEmployeesURL = 'http://localhost:5000/api/employees'
const putPayrollURL = 'http://localhost:5000/api/payroll/update'
// const getPayrollURL = 'http://localhost:5000/api/payroll'
const getPayrollsURL = 'http://localhost:5000/api/payrolls'


const updateEmployeeForm = reactive({
  nationalID: '',
  pobsInsurableEarnings: '',
  actualInsurableEarnings: '',
})

let payrollToUpdate: object
let employeeToUpdate: object

const handleSubmit = async () => {
  const nationalID = updateEmployeeForm['nationalID']
  const basePay = parseFloat(updateEmployeeForm['actualInsurableEarnings'])
  const pobsContribution = 0.09 * basePay
  const basicAPWCS = 0.0132 * basePay

  employeeToUpdate = {
    nationalID: nationalID,
    pobsInsurableEarnings: basePay,
    pobsContribution: pobsContribution,
    basicAPWCS: basicAPWCS,
    actualInsurableEarnings: basePay
  }

  axios.put(putEmployeeURL, employeeToUpdate).then(() => {
    toast.success('Employee updated successfully!')
    router.push('/')
  }).catch(error => {
    toast.error('Something went wrong')
    console.log(error)
  })

  axios.get(getPayrollsURL).then(response => {
    const jsonData = response.data
    let i = 0
    let found: boolean | undefined = false
    let transportAllowance: number | undefined = 0.0
    let housingAllowance: number | undefined = 0.0
    let commission: number | undefined = 0.0

    while (i < jsonData.length) {
      if (jsonData[i]['idNumber'] == nationalID) {
        found = true
        transportAllowance = parseFloat(jsonData[i]['transportAllowance'])
        housingAllowance = parseFloat(jsonData[i]['housingAllowance'])
        commission = parseFloat(jsonData[i]['commission'])
      }
      i++
    }
    const grossPay = basePay + transportAllowance + housingAllowance + commission
    const nssaPension = basePay * 0.045
    const taxableIncome = grossPay - nssaPension

    let paye = 0

    switch (true) {
      case taxableIncome >= 0 && taxableIncome <= 100:
        paye = 0
        break
      case taxableIncome >= 100.01 && taxableIncome <= 300:
        paye = taxableIncome * 0.2 - 20
        break
      case taxableIncome >= 300.01 && taxableIncome <= 1000:
        paye = taxableIncome * 0.25 - 35
        break
      case taxableIncome >= 1000.01 && taxableIncome <= 2000:
        paye = taxableIncome * 0.3 - 85
        break
      case taxableIncome >= 2000.01 && taxableIncome <= 3000:
        paye = taxableIncome * 0.35 - 185
        break
      case taxableIncome >= 3000.01:
        paye = taxableIncome * 0.4 - 335
        break
    }
    const aidsLevy = paye * 0.03
    const totalDeductions = paye + aidsLevy + nssaPension
    const netPay = grossPay - totalDeductions

    payrollToUpdate = {
      idNumber: nationalID,
      basePay: basePay,
      housingAllowance: housingAllowance,
      trasportAllowance: transportAllowance,
      commission: commission,
      grossPay: grossPay,
      payeUSD: paye,
      aidsLevyUSD: aidsLevy,
      nssaLevyUSD: nssaPension,
      totalDeductionsUSD: totalDeductions,
      netPayUSD: netPay
    }


    if (found == true) {
      if (updateEmployeeForm['pobsInsurableEarnings'] == updateEmployeeForm['actualInsurableEarnings']) {
        axios.put(putPayrollURL, payrollToUpdate).then(() => {
          toast.success('Payroll updated successfully!')
        }).catch(error => {
          toast.error('Something went wrong')
          console.log(error.response)
        })
      } else {
        toast.warning('POBS insurable earnings and actual insurable earnings should be the same')
      }
    } else {
      toast.info(`Employee with ID ${nationalID} does not have a payslip`)
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
    <Hero title="Update Employee"></Hero>
  </div>
  <section class="bg-white w-auto mx-60 my-30">
    <div class="container m-auto max-w-4xl">
      <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <!-- Form title -->
          <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="updateEmployeeForm.nationalID" id="idNumber" name="idNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
            <input type="number" v-model="updateEmployeeForm.pobsInsurableEarnings" id="pobsInsurableEarnings"
              name="pobsInsurableEarnings" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="POBS Insurable Earnings" required>
            <input type="number" v-model="updateEmployeeForm.actualInsurableEarnings" id="actualInsurableEarnings"
              name="actualInsurableEarnings" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Actual Insurable Earnings" required>
          </div>

          <!-- 3rd row -->
          <!-- <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="text" v-model="updateEmployeeForm.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First Name" required>
            <input type="number" v-model="updateEmployeeForm.actualInsurableEarnings" id="actualInsurableEarnings"
              name="actualInsurableEarnings" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Actual Insurable Earnings" required>
          </div> -->

          <!-- <input type="number" v-model="updateEmployeeForm.pobsInsurableEarnings" id="pobsInsurableEarnings"
              name="pobsInsurableEarnings" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="POBS Insurable Earnings" required> -->


          <!-- 4th row -->

          <!-- 5th row -->
          <!-- <div class="mb-4 grid grid-cols-2 gap-2">
            <input type="number" v-model="updateEmployeeForm.actualInsurableEarnings" id="actualInsurableEarnings"
              name="actualInsurableEarnings" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Actual Insurable Earnings" required>
          </div> -->
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
