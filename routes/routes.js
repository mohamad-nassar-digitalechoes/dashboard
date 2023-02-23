const express=require('express');
const Controller = require('../Controllers/Controller');
const AuthController = require('../Controllers/AuthController');
const middleware = require('./middleware');
const BrandController = require('../Controllers/BrandController');
const routes=express.Router();
routes.post('/admin/login',AuthController.login);
routes.post('/admin/login/google',AuthController.login);
routes.post('/admin/create',AuthController.create);
routes.post('/admin/update',middleware.auth,AuthController.update);
routes.get('/admin/info',middleware.auth,AuthController.info);
routes.post('/admin/brand/check',middleware.auth,BrandController.checkbrand);
routes.post('/admin/brand/create',middleware.auth,BrandController.createBrand);


routes.get('*',(req,res)=>{
    res.status(405).send('Error');
});
routes.post('*',(req,res)=>{
    res.status(405).send('Error');
});

module.exports=routes;