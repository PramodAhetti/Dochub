const express=require('express');
const connectDB=require('./config/db');
const app=express();
const cors = require('cors');
const morgan = require('morgan')
const bodyparser=require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


//connecting to database
connectDB();
app.use(cors());
app.use(cookieParser());
//middleware
app.use(bodyparser.json())
app.use(morgan('dev'))


//routes
app.get('/main',(req,res)=>res.send({name:"pramod",token:"adfa5545421212121",user_id:"ad4fa65df4a5dfaa"}));


app.use('/doctor',require('./routes/doctor.js'))
app.use('/user',require('./routes/users'));
app.use('/report',require('./routes/report'));

const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`server running on port ${PORT}`))