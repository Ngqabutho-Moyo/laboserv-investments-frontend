// import json from 'sequelize'
import createPayrollRepo from '../repositories/payroll.repositories.js'

export const createPayroll = async (req, res) => {
  try {
    const newPayroll = await createPayrollRepo(req)
    console.log(newPayroll)
    res.send('Done!')
  } catch (error) {
    console.log(error)
  }
}

export const getPayrolls = async (req, res) => {
  try {
    res.send('Get Payrolls')
  } catch (error) {
    res.send(error)
  }
}

module.exports = { createPayroll, getPayrolls }
