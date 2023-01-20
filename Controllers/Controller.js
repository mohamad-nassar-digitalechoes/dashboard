const express=require('express');

class Controller 
{
    static welcome(req,res)
    {
        return res.send('Hello world');
    }
    static testpost(req,res)
    {
        return res.json(req.body);
    }
        
}

module.exports=Controller;