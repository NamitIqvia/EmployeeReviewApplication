const express = require('express');
const cors = require('cors');
const user = require('./api/routes/users');
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())
mongoose.connect('mongodb+srv://namit:Monday09@employeerev.d10vm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useMongoClient: true})
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use("/users", user)


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

