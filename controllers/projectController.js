const projects = require("../model/projectModel");


exports.addprojectController = async(req,res)=>{
    //logic
   const {title, language , github , website, Overview} = req.body
   console.log(title, language , github , website, Overview);

   const projectImage = req.file.filename
   console.log(projectImage);
   const userId = req.payload
   
   try {
    
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json('Project already exist')
    }
    else{
        const newproject = new projects({
            title , language , github , website , Overview , projectImage , userId 
        })
        await newproject.save()
        res.status(200).json(newproject)
    }

   } catch (error) {
    res.status(401).json('Project added failed due to', error)
   }
}


// get all projects

exports.getallprojectController = async(req,res)=>{
    //path parameter = req.params
    //query parameter =req.query

    const searchkey = req.query.search
    console.log(searchkey);

    const query ={
        language:{
            $regex:searchkey, $options:"i"
        },
        title:{
            $regex:searchkey, $options:"i"
        }
    }
    

    
    try {
        const allprojects = await projects.find(query)
        res.status(200).json(allprojects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get home projects

exports.gethomeprojectController = async(req,res)=>{
    try {
        const allprojects = await projects.find().limit(3)
        res.status(200).json(allprojects)
    } catch (error) {
        res.status(401).json(error)
    }
}


// get user projects

exports.getuserprojectController = async(req,res)=>{
    const userId = req.payload
    try {
        const allprojects = await projects.find({userId})
        res.status(200).json(allprojects)
    } catch (error) {
        res.status(401).json(error)
    }
}

//remove user projects

exports.removeruserprojectController = async(req,res)=>{
    const {id} = req.params

    try {
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('Deleted successfully')
    } catch (error) {
        res.status(401).json(error)
    }
}

//update user projects
exports.updateprojectController = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title, language , github , website, Overview, projectImage} = req.body

    const updatedimage = req.file?req.file.filename : projectImage

    try {
        const existingproject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            Overview,
            projectImage:updatedimage,
            userId
        },{new:true})
        await existingproject.save()
        res.status(200).json(existingproject)

        
    } catch (error) {
        res.status(401).json(error)
    }
}

//{new:true} is used to save data as new value