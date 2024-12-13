<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification'
// import router from '@/router';

defineProps({
  title: {
    type: String,
    default: 'Payroll Form'
  }
})

const toast = useToast()
const createPayrollURL = 'http://localhost:5000/api/payrolls/create'
// const getEmployeesURL = 'http://localhost:5000/api/employees'
const getEmployeeURL = 'http://localhost:5000/api/employee'
// const getPayrollsURL = 'http://localhost:5000/api/payrolls/'

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
  /**Before we create a new payroll, we need to validate 2 things:
   * 1. Does the employee exist in the employees table?
   * 2. Has the payroll already been created?
   */
  const getEmployeeConfig = {
    params: {
      firstName: form['firstName'],
      surname: form['surname']
    }
  }

  axios.get(getEmployeeURL, getEmployeeConfig).then(response => {
    const jsonData = response.data
    if (jsonData > 0) {
      if (jsonData['pobsInsurableEarnings'] == form['basePay']) {
        console.log('Create')
        axios.post(createPayrollURL, form).then(response => {
          console.log(response)
          toast.success('Payroll created successfully')
        }).catch(error => {
          toast.error('Failed to create payroll')
          console.log(error.response.data)
        })
      }
    } else {
      toast.warning('Employee could not be found')
    }
  }).catch(error => {
    toast.error('Failed to get employee')
    console.log(error.response.data)
  })

  // let validators = {}

  // axios.get(getEmployeesURL).then(response => {
  //   const jsonData = response.data
  //   let nationalID: string
  //   let ssnNumber: string
  //   let basePay: number
  //   let i = 0

  //   while (i < jsonData.length) {
  //     if (jsonData[i]['nationalID'] == idNumber) {
  //       nationalID = jsonData[i]['nationalID']
  //       ssnNumber = jsonData[i]['ssnNumber']
  //       basePay = parseFloat(jsonData[i]['actualInsurableEarnings'])
  //     }
  //     i++
  //   }

  //   // validators = {
  //   //   nationalID: nationalID,
  //   //   ssnNumber: ssnNumber,
  //   //   basePay: basePay
  //   // }

  //   if (nationalID != null) {
  //     // if (ssnNumber != form['nssaNumber']) {
  //     if (form['basePay'] == basePay) {
  //       // console.log('Pass')
  //       axios.post(createPayrollURL, form).then((response) => {
  //         console.log(response)
  //         toast.success('Payroll was added successfully!')
  //         router.push('/')
  //       }).catch((error) => {
  //         console.log(error)
  //         toast.error('Something went wrong')
  //       })
  //     } else {
  //       toast.warning(`Base pay does not match insurable earnings of ${basePay}`)
  //     }
  //     // } else {
  //     //   toast.warning(`Employee with NSSA number ${ssnNumber} already has a payroll. Perhaps you want to update?`)
  //     // }
  //   } else {
  //     toast.warning(`Employee with id ${idNumber} does not exist`)
  //   }
  // }).catch(error => {
  //   console.log(error)
  // })

  // axios.get(getPayrollsURL).then(response => {
  //   const jsonData = response.data
  //   let idNumber: string
  //   let basePay: number
  //   let i = 0

  //   while (i < jsonData.length) {
  //     if (jsonData[i]['nationalID'] == form['idNumber']) {
  //       idNumber = jsonData[i]['idNumber']
  //       basePay = parseFloat(jsonData[i]['basePay'])
  //       i++
  //     }
  //   }

  //   // const dataToValidate=validators

  //   // Validate employee
  //   if (validators['nationalID'] == form['idNumber']) {
  //     console.log('Employee exists')

  //     // Validate payslip
  //     // if (idNumber == form['idNumber']) {
  //     //   console.log('Employee does not have a payroll yet')
  //     // } else {
  //     //   console.log('Employee already has a payroll')
  //     // }
  //   } else {
  //     console.log('Employee does not exist')
  //   }

  // }).catch(error => {
  //   console.log(error)
  // })

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
