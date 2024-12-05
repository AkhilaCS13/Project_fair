//import express
const express = require('express')

//immport usercontroller
const userController = require('./controllers/userController')

//immport usercontroller
const projectController = require('./controllers/projectController')

//import jwtmiddleware
const jwt = require('./middleware/jwtMiddleware')
//import multer
const multerconfig = require('./middleware/multerMiddleware')

//instance router(object)
const router =new express.Router()

//REGISTER
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//add project
router.post('/add-project',jwt,multerconfig.single("projectImage"),projectController.addprojectController)

// get all projects
router.get('/all-project',jwt,projectController.getallprojectController)

// get home projects
router.get('/home-project',projectController.gethomeprojectController)

// get user projects
router.get('/user-project',jwt,projectController.getuserprojectController)

// delete user projects
router.delete('/remove-project/:id',jwt,projectController.removeruserprojectController)

// update user project
router.put('/update-project/:id',jwt,multerconfig.single("projectImage"),projectController.updateprojectController)

//update profile
router.put('/update-profile',jwt,multerconfig.single("profile"),userController.editProfileController)


module.exports = router