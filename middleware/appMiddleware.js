


const appMiddleware =(req , res , next)=>{
    console.log('inside app');
    next()
    
}

module.exports = appMiddleware