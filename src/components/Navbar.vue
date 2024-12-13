<script lang="ts">
import Dropdown from './Dropdown.vue';
import { RouterLink } from 'vue-router';
// import logo from '@/assets/img/laboserv2.png';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'navbar',
  components: {
    Dropdown,
    RouterLink
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
        // {
        //   title: 'Update Existing Payroll',
        //   link: 'update-payroll',
        // },
        {
          title: 'Create Backup Files',
          link: '#',
        },
        {
          title: 'Concatenate Files',
          link: '#',
        },
        {
          title: 'Open Payroll For This Month',
          link: 'open-monthly-payroll',
        },
        {
          title: 'Open Entire Payroll',
          link: 'open-existing-payroll',
        },
      ],
      employees: [
        {
          title: 'Create New Employee',
          link: 'create-employee',
        },
        {
          title: 'View Existing Employees',
          link: 'view-existing-employees',
        },
        {
          title: 'Update Employee',
          link: 'update-employee',
        },
        {
          title: 'Delete Employee',
          link: 'delete-employee',
        },
      ],
      taxAndOtherTables: [
        {
          title: 'Tax Tables',
          link: 'tax-tables'
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
          title: 'Payroll Summary',
          link: 'payroll-summary'
        },
        {
          title: 'Payroll Summary for Last Month',
          link: 'monthly-payroll-summary'
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
  <nav class="bg-sky-300 border-b">
    <!-- <img class="h-10 w-auto" v-bind:src="logo" alt="laboserv"> -->
    <div class="menu-item">
      <RouterLink to="/">Home</RouterLink>
    </div>
    <Dropdown title="Payroll Files" :items="payrollFiles"></Dropdown>
    <Dropdown title="Employees" :items="employees"></Dropdown>
    <div class="menu-item">
      <RouterLink to="#">Payslip Entries</RouterLink>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

nav .menu-item {
  color: lightblue;
  padding: 10px 30px;
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
