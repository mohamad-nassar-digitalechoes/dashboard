const jwt=require('jsonwebtoken');
const mongoose=require("mongoose");
const Admin=require('../Models/Admins');
class middleware
{
    static async auth(req,res,next)
    {
        try {
            const token=req.header("admin-token");
            if(!token)
            {
                return res.status(401).json({
                    status:401,
                    msg: "Unauthorized",
                  });
            }
            const verification = jwt.verify(token, "admin-token");
           
            if (!verification) {
                return res.status(401).json({
                    status:401,
                    msg: "Unauthorized",
                  });
            }
            const admin_id=verification.id;
            const admin=await Admin.findOne({_id:admin_id});
            if(!admin)
            {
                return res.status(401).json({
                    status:401,
                    msg: "Unauthorized",
                  });
            }
            next();
        } catch (error) {
            return res.status(401).json({
                status:401,
                msg: "Unauthorized",
              });
        }
    }
    
}

module.exports=middleware;