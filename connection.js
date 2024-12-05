//import mongoose

const mongoose = require('mongoose')

connectionstring = process.env.DATABASE

mongoose.connect(connectionstring).then((res)=>{
    console.log('mongoDB connected successfully');
    
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
    
})