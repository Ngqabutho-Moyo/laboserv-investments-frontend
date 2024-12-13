import { Router } from 'express'
const router = Router()

import { createPayroll, getPayrolls } from '../controllers/payroll.controller.js'

router.get('/', getPayrolls)
router.post('/create-payroll', createPayroll)

module.exports = { router }
