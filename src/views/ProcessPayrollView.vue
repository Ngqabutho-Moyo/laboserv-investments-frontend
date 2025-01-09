<script setup lang="ts">
import PayrollSummary from '@/components/Process Payroll/PayrollSummary.vue';
import Employees from '@/components/Process Payroll/Employees.vue';
import PayslipEntries from '@/components/Process Payroll/PayslipEntries.vue';
// import calendar from 'vue-simple-calendar'

// calendar=calendar
</script>

<template>
  <!-- <div id='pdf' class="mb-10">
    <Navbar></Navbar>
  </div> -->
  <div>
    <!-- <Hero title="Process Payroll"></Hero> -->
    <div id="wrapper" class="mb-5">
      <div class="grid grid-cols-1 gap-1 flex space-y-15">
        <PayrollSummary></PayrollSummary>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <p><strong>Initiated by</strong></p>
        <p>................................................</p>
        <p><strong>Confirmed by Pride Maguta</strong></p>
        <p>...............................................</p>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <p><strong>Verified by Pride Maguta</strong></p>
        <p>................................................</p>
        <p><strong>Approved by Pride Maguta</strong></p>
        <p>...............................................</p>
      </div>
    </div>
    <div style="break-after:page"></div>
    <div>
      <Employees></Employees>
    </div>
    <div style="break-after:page"></div>
    <PayslipEntries></PayslipEntries>
  </div>
  <!-- <TaxTables></TaxTables> -->
</template>

<style>
/* #wrapper {
  height: 860px;
  width: 595px;
  padding-bottom: 950px;
  margin-left: auto;
  margin-right: auto;
} */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@page {
  size: A4;
  /* margin: 0; */
  /* padding: 0; */
}

/* html,
body {
  width: 210mm;
  height: 297mm;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>
