import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import PayslipEntriesView from '@/views/PayslipEntriesView.vue'
import PayslipEntryView from '@/views/PayslipEntryView.vue'
import AuditTrailView from '@/views/AuditTrailView.vue'
import HelpView from '@/views/HelpView.vue'
import ProcessPayrollView from '@/views/ProcessPayrollView2.vue'
import TaxAndOtherTablesView from '@/views/TaxAndOtherTablesView.vue'
import CreateNewPayrollView from '@/views/Payroll Files/CreateNewPayrollView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView,
    },
    {
      path: '/payslip-entries',
      name: 'payslip-entries',
      component: PayslipEntriesView,
    },
    {
      path: '/payslip-entry',
      name: 'payslip-entry',
      component: PayslipEntryView,
    },
    {
      path: '/audit-trail',
      name: 'audit-trail',
      component: AuditTrailView,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
    },
    {
      path: '/process-payroll',
      name: 'process-payroll',
      component: ProcessPayrollView,
    },
    {
      path: '/tax-and-other-tables',
      name: 'tax-and-other-tables',
      component: TaxAndOtherTablesView,
    },
    {
      path: '/audit-trail',
      name: 'audit-trail',
      component: AuditTrailView,
    },
    {
      path: '/create-new-payroll',
      name: 'create-new-payroll',
      component: CreateNewPayrollView,
    },
  ],
})

export default router
