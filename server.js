const express=require('express')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')
const app=express()
const mongoose=require("mongoose")
const session=require('express-session')
const nocache=require('nocache')
const bcrypt = require('bcrypt');

//const connectDB=require('./server/database/connection')

app.set('view engine','ejs')

//log requests
app.use(morgan('tiny'));
app.use(nocache())

//connectDB()
mongoose.connect('mongodb://127.0.0.1:27017/crudfile')

app.use(session({
    secret:"secret",
    resave:"false",
    cookie:{sameSite:"strict"},
    saveUninitialized:true
}))

app.use(bodyparser.urlencoded({extented:true}))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/CSS")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/image',express.static(path.resolve(__dirname,"assets/image")))

app.use('/',require('./server/routes/router'))

app.listen(2008,()=>{console.log('server is running')})