<script lang="ts">
import Dropdown from './Dropdown.vue';
import { RouterLink } from 'vue-router';
// import logo from '@/assets/img/laboserv2.png';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'navbar',
  components: {
    Dropdown,
  },
  data: () => {
    return {
      payrollFiles: [
        {
          title: 'Pay Calendar',
          link: '#',
        },
        {
          title: 'Change Password',
          link: '#',
        },
        {
          title: 'Profiles',
          link: '#',
        },
        {
          title: 'View License Period',
          link: '#',
        },
        {
          title: 'View Database Path',
          link: '#',
        },
        {
          title: 'Create New Payroll',
          link: 'create-new-payroll',
        },
        {
          title: 'Create Backup Files',
          link: '#',
        },
        {
          title: 'Concatenate Files',
          link: '#',
        },
        {
          title: 'Open Existing Payroll',
          link: '#',
        },
        {
          title: 'Open Existing Payroll',
          link: '#',
        },
      ],
      taxAndOtherTables: [
        {
          title: 'Tax Tables',
          link: '#'
        },
        {
          title: 'Employee/Employer Contributions',
          link: '#'
        },
        {
          title: 'Tax Free Bonus and NSSA Ceiling',
          link: '#'
        },
        {
          title: 'Miscellaneous Settings',
          link: '#'
        },
        {
          title: 'Reset Accumulated Credits',
          link: '#'
        },
        {
          title: 'Update Tax Bands from Web',
          link: '#'
        },
        {
          title: 'Update NSSA Ceiling from Web',
          link: '#'
        },
      ],
      reports: [
        {
          title: 'Payroll Statistics',
          link: '#'
        },
        {
          title: 'Non-categorized Period Summaries',
          link: '#'
        },
        {
          title: 'Categorized Period Summaries',
          link: '#'
        },
        {
          title: 'Pay Out List',
          link: '#'
        },
      ],
    }
  }
}
</script>

<template>
  <nav class="bg-sky-300 border-b border-blue-500">
    <!-- <img class="h-10 w-auto" v-bind:src="logo" alt="laboserv"> -->
    <div class="menu-item">
      <RouterLink to="/">Home</RouterLink>
    </div>
    <Dropdown title="Payroll Files" :items="payrollFiles"></Dropdown>
    <div class="menu-item">
      <RouterLink to="/employees">Employees</RouterLink>
    </div>
    <div class="menu-item">
      <RouterLink to="payslip-entries">Payslip Entries</RouterLink>
    </div>
    <Dropdown title="Tax and Other Tables" :items="taxAndOtherTables"></Dropdown>
    <div class="menu-item">
      <RouterLink to="process-payroll">Process Payroll</RouterLink>
    </div>
    <Dropdown title="Reports" :items="reports"></Dropdown>
    <div class="menu-item">
      <RouterLink to="help">Help</RouterLink>
    </div>
    <div class="menu-item">
      <RouterLink to="audit-trail">Audit Trail</RouterLink>
    </div>
  </nav>
</template>

<style>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

nav .menu-item {
  color: lightblue;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: white;
  border-bottom-color: #06bbf1;
}

nav .menu-item {
  color: inherit;
  text-decoration: none;
}
</style>
