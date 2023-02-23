const mongoose=require('mongoose');

const brandSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    industry:{
        type:String,
        required:true,
        trim:true
    },
    slogan:{
        type:String,
        required:true,
        trim:true,
    },
    website:{
        required:true,
        trim:true,
        type:String
    },
    address:{
        required:true,
        trim:true,
        type:String
    },
    country:{
        required:true,
        trim:true,
        type:String
    },
    state:{
        required:true,
        trim:true,
        type:String
    },
    city:{
        required:true,
        trim:true,
        type:String
    },
    zip:{
        required:true,
        trim:true,
        type:String
    },
    phone:{
        required:true,
        trim:true,
        type:String
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
    platform: [{
        key: String,
        value: String
      }],
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admins'
    }
});

const Admin=mongoose.model("Brands",brandSchema);
module.exports=Admin;