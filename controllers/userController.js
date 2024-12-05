const users = require("../model/userModel");
const jwt = require('jsonwebtoken')


//register

exports.register =async(req,res)=>{
    //logic
    console.log('inside register function');
    const {username,email,password} = req.body
    console.log(username,email,password);
    
   

    try{
        const existinguser = await users.findOne({ email })
        console.log(existinguser);
        
        if(existinguser){
            res.status(406).json('User Already Exist')
        }
        else{
            const newuser = new users({
                username,
                email,
                password,
                profile:"",
                github:"",
                linkedin:""
            })
            await newuser.save()
            res.status(200).json(newuser)
        }

    }
    catch(error){
        res.status(401).json(error)
    }
    
}

//login


exports.login = async(req,res)=>{
    const {email,password} = req.body
    console.log(email,password);

    try{
        const existinguser = await users.findOne({email , password})
        if(existinguser){
            const token = jwt.sign({userId:existinguser._id},'secretkey')
            res.status(200).json({existinguser,token})
        }
        else{
            res.status(406).json('Incorret Email ID or password')
        }
    }
    catch(error){
        res.status(401).json(error)
        
    }
    
}

//update user profile

exports.editProfileController = async(req,res)=>{
    const userId = req.payload
    const { username , email , password , profile, github , linkedin} = req.body
    uploadImg = req.file?req.file.filename:profile

    try {
        
        const existinguser = await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            profile:uploadImg,
            github,
            linkedin
        },{new:true})

        await existinguser.save()
        res.status(200).json(existinguser)

    } catch (error) {
        res.status(401).json(error)
    }


}