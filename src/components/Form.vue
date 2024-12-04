<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { reactive } from 'vue';
// import { createPayrollRepo } from '../repositories/payroll.repo.js'
// import { createPayroll } from '../controllers/payroll.controller.js'

defineProps({
  title: {
    type: String,
    default: 'Payroll Form'
  }
})
const form = reactive({
  firstName: '',
  lastName: '',
  worksNumber: '',
  grade: '',
  department: '',
  idNumber: '',
  dateJoined: '',
  daysTaken: '',
  leaveBal: '',
  loan: '',
  nssaNumber: '',
  medicalAidNumber: '',
  bank: 'Bank',
  branch: '',
  accountNumber: '',
  basePay: '',
  housingAllowance: '',
  transportAllowance: '',
  commission: '',
});

// let new_payslip: { payeUSD: number; aidsLevyUSD: number; nssaLevyUSD: number; }

const handleSubmit = async () => {
  const grossPay = parseInt(form.basePay) + parseInt(form.housingAllowance) + parseInt(form.transportAllowance) + parseInt(form.commission)
  // const nssaWCIF = parseInt(form.basePay) * 0.0132
  const nssaPension = parseInt(form.basePay) * 0.045
  // const zimdef = grossPay * 0.01
  const taxableIncome = grossPay - nssaPension
  let paye = 0
  switch (true) {
    case taxableIncome >= 0 && taxableIncome <= 100:
      paye = 0;
      break;
    case taxableIncome >= 100.01 && taxableIncome <= 300:
      paye = taxableIncome * 0.2 - 20;
      break;
    case taxableIncome >= 300.01 && taxableIncome <= 1000:
      paye = taxableIncome * 0.25 - 35;
      break;
    case taxableIncome >= 1000.01 && taxableIncome <= 2000:
      paye = taxableIncome * 0.3 - 85;
      break;
    case taxableIncome >= 2000.01 && taxableIncome <= 3000:
      paye = taxableIncome * 0.35 - 185;
      break;
    case taxableIncome >= 3000.01:
      paye = taxableIncome * 0.4 - 335;
      break;
  }
  const aidsLevy = paye * 0.03;
  const totalDeductions = paye + aidsLevy + nssaPension
  const netPay = grossPay - totalDeductions

  const payslip = {
    grossPayUSD: grossPay,
    payeUSD: paye,
    aidsLevyUSD: aidsLevy,
    nssaLevyUSD: nssaPension,
    totalDeductionsUSD: totalDeductions,
    netPayUSD: netPay
  }

  const payroll = {
    firstName: form.firstName,
    lastName: form.lastName,
    worksNumber: form.worksNumber,
    grade: form.grade,
    department: form.department,
    idNumber: form.idNumber,
    dateJoined: form.dateJoined,
    daysTaken: form.daysTaken,
    leaveBal: form.leaveBal,
    loan: form.loan,
    nssaNumber: form.nssaNumber,
    medicalAidNumber: form.medicalAidNumber,
    bank: form.bank,
    branch: form.branch,
    accountNumber: form.accountNumber,
    basePay: form.basePay,
    housingAllowance: form.housingAllowance,
    transportAllowance: form.transportAllowance,
    commission: form.commission,
    payslip: payslip
  }
  console.log(payroll.payslip)
  // try {
  //   const newPayroll = createPayrollRepo()
  //   console.log(newPayroll)
  // } catch (error) {
  //   console.log(error)
  // }
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
  <section class="bg-sky-300 w-auto mx-60 my-10">
    <div class="container m-auto max-w-4xl">
      <div class="bg-white px-12 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <!-- Form title -->
          <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>

          <!-- 1st row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.firstName" id="firstName" name="firstName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="First name" required>
            <input type="text" v-model="form.lastName" id="lastName" name="lastName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Last name" required>
            <input type="text" v-model="form.worksNumber" id="worksNumber" name="worksNumber"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Works #">
          </div>

          <!-- 2nd row -->
          <div class="mb-4 grid grid-cols-3 gap-3">
            <input type="text" v-model="form.grade" id="grade" name="grade" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Grade" required>
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
            <input type="text" v-model="form.leaveBal" id="leaveBal" name="leaveBal"
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
            <input type="number" v-model="form.transportAllowance" id="transportAllowance" name="transportAllowance"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Transport allowance" required>
            <input type="number" v-model="form.housingAllowance" id="housingAllowance" name="housingAllowance"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Housing allowance" required>
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
