// import express, { json } from 'express'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require('express')
// import route from './routes/payroll.routes.js'
const app = express()
const PORT = 5000

app.use(json())

// eslint-disable-next-line @typescript-eslint/no-require-imports
app.use('/api', require('./routes/payroll.routes.js'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
