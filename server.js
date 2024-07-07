const express=require("express")

const dotenv=require("dotenv").config();
const PORT=process.env.PORT || 5000

const contactsroutes=require("./routes/contactroutes");
const userRoutes=require("./routes/userroutes");

const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
connectDb();
const app=express()


app.use(express.json())
app.use('/api/contacts',contactsroutes)
app.use('/api/users',userRoutes)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})