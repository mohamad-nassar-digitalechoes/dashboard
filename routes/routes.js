const express=require('express');
const Controller = require('../Controllers/Controller');
const AuthController = require('../Controllers/AuthController');
const middleware = require('./middleware');
const uploadService = require('../services/upload');
const routes=express.Router();
const upload=require('./upload');
routes.post('/admin/login',AuthController.login);
routes.post('/admin/create',middleware.auth,AuthController.create);
routes.post('/admin/update',middleware.auth,AuthController.update);
routes.get('/admin/info',middleware.auth,AuthController.info);
routes.get('/admins',middleware.auth,AuthController.alladmins);
routes.get('/agencies',middleware.auth,AuthController.allagency);
routes.post('/resize',upload.single('image'),uploadService.resize);

routes.post('/post',Controller.testpost);

routes.get('*',(req,res)=>{
    res.status(405).send('Error');
});
routes.post('*',(req,res)=>{
    res.status(405).send('Error');
});

module.exports=routes;