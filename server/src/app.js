const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
<<<<<<< HEAD
app.use(morgan('combine'))
app.use(bodyParser.json()
app.use(cors())

=======
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
>>>>>>> f8930e849946e35e8cb1b1a369223d0ccf309aca
