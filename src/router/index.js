import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuditTrailView from '@/views/AuditTrailView.vue'
import HelpView from '@/views/HelpView.vue'
import ProcessPayrollView from '@/views/ProcessPayrollView.vue'
import TaxAndOtherTablesView from '@/views/TaxAndOtherTablesView.vue'
import CreateNewPayrollView from '@/views/Payroll Files/CreateNewPayrollView1.vue'
import CreateNewEmployeeView from '@/views/Employees/CreateNewEmployeeView.vue'
import ViewExistingEmployeesView from '@/views/Employees/ViewExistingEmployeesView.vue'
import DeleteEmployeeView from '@/views/Employees/DeleteEmployeeView.vue'
import PayrollSummariesView from '@/views/Reports/PayrollSummariesView.vue'
import TaxTablesView from '@/views/Tax and Other Tables/TaxTablesView.vue'
import OpenExistingPayrollView from '@/views/Payroll Files/OpenExistingPayrollView.vue'
import UpdateEmployeeView from '@/views/Employees/UpdateEmployeeView.vue'
import UpdatePayrollView from '@/views/Payroll Files/UpdatePayrollView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/payroll-summaries',
      name: 'payroll-summmaries',
      component: PayrollSummariesView,
    },
    {
      path: '/create-employee',
      name: 'create-employee',
      component: CreateNewEmployeeView,
    },
    {
      path: '/view-existing-employees',
      name: 'view-existing-employees',
      component: ViewExistingEmployeesView,
    },
    {
      path: '/update-employee',
      name: 'update-employee',
      component: UpdateEmployeeView,
    },
    {
      path: '/delete-employee',
      name: 'delete-employee',
      component: DeleteEmployeeView,
    },
    {
      path: '/open-existing-payroll',
      name: 'open-existing-payroll',
      component: OpenExistingPayrollView,
    },
    {
      path: '/update-payroll',
      name: 'update-payroll',
      component: UpdatePayrollView,
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
      path: '/tax-tables',
      name: 'tax-tables',
      component: TaxTablesView,
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
