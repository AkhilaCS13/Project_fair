const jwt = require('jsonwebtoken')


const jwtMiddlewre = (req , res , next)=>{
    console.log('inside jwt');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token,'secretkey')
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        
        next()   
        
    } catch (error) {
        res.status(401).json('authorization failed due to', error)
    }
    
    
}

module.exports = jwtMiddlewre