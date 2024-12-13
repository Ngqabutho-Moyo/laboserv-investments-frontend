// import express, { json } from 'express'

import express from 'express'
import { router } from './routes/payroll.routes.js'
const app = express()
const PORT = 5000

// app.use(json())

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
