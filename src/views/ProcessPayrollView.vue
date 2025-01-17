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
      <div>
        <PayrollSummary></PayrollSummary>
      </div>
      <div class="grid grid-cols-4 gap-4 py-8">
        <p><strong>Initiated by</strong></p>
        <p>.........................................</p>
        <p><strong>Confirmed by Pride Maguta</strong></p>
        <p>.........................................</p>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <p><strong>Verified by Pride Maguta</strong></p>
        <p>..........................................</p>
        <p><strong>Approved by Pride Maguta</strong></p>
        <p>..........................................</p>
      </div>
    </div>
    <div style="break-after:page"></div>
    <div>
      <Employees></Employees>
    </div>
    <div style="break-after:page"></div>
    <div>
      <PayslipEntries></PayslipEntries>
    </div>
  </div>
  <!-- <TaxTables></TaxTables> -->
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* @page {
  size: A4;
  orientation: landscape;
} */
</style>
