const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:(value)=>{
                const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re)
            },
            message:'Please enter a valid email address'
        }
    },
    password:{
        required:true,
        trim:true,
        type:String
    },
    type:{
        required:true,
        trim:true,
        type:String
    },
    status:{
        required:true,
        trim:true,
        type:String
    }
});

const Admin=mongoose.model("Admins",adminSchema);
module.exports=Admin;