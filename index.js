const express=require('express')

const mongoose=require('mongoose')
const app=express();
const dotenv=require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URL,{

}).then(()=>{console.log('connected')}).catch(err=>console.log(err))

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/user',require('./routes/users'))
app.use('/api/movie',require('./routes/movies'))
app.use('/api/list',require('./routes/lists'))



app.listen(8000,()=>{
    
    console.log('running app') })