// import { raw } from 'express'
import db from '../models/index.js'

const createPayrollRepo = async (req) => {
  try {
    const newPayroll = await db.Payroll.create({
      firstName: req.firstName,
      surame: req.lastName,
      worksNumber: req.worksNumber,
      grade: req.grade,
      department: req.department,
      idNumber: req.idNumber,
      dateJoined: req.dateJoined,
      daysTaken: req.daysTaken,
      leaveBalance: req.leaveBalance,
      loan: req.loan,
      nssaNumber: req.nssaNumber,
      medicalAidNumber: req.medicalAidNumber,
      bank: req.bank,
      accountNumber: req.accountNumber,
      basePay: req.basePay,
      transportAllowance: req.transportAllowance,
      housingAllowance: req.housingAllowance,
      commission: req.commission,
      grossPay: req.payslip.grossPay,
      payeUSD: req.payslip.payeUSD,
      aidsLevyUSD: req.payslip.aidsLevy,
      nssaLevyUSD: req.payslip.nssaLevyUSD,
      totalDeductionsUSD: req.payslip.totalDeductions,
      netPayUSD: req.payslip.netPayUSD,
    })
    return newPayroll
  } catch (error) {
    console.log(error)
  }
}
export default { createPayrollRepo }
