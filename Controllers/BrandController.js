const Brand = require("../Models/Brands");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admins");
class BrandController {
    static async checkbrand(req,res)
    {
        try {
        const token=req.header("admin-token");
        const verification = jwt.verify(token, "admin-token");
        const check=await Brand.find({admin:verification.id});
        if(check.length>0)
        {
            return res.status(200).json({
                status:200,
                msg:"Brand exist"
            });
        }
        else
        {
            return res.status(200).json({
                status:300,
                msg:"Brand not exist"
            });
        }
        } catch (error) {
            return res.status(500).json({
                msg: error.message,
              });
        }
    }
  static async createBrand(req,res)
  {
    try {
        const {name,industry,slogan,website,address,country,state,city,zip,phone,email}=req.body;
        const token=req.header("admin-token");
        const verification = jwt.verify(token, "admin-token");
        let brand = new Brand({
          name:name,
          industry:industry,
          slogan:slogan,
          website:website,
          address:address,
          country:country,
          state:state,
          city:city,
          zip:zip,
          phone:phone,
          email:email,
          admin:verification.id
        });
        await brand.save();
        return res.status(200).json({
          msg: "Brand has been created",
        });
      } catch (error) {
        return res.status(500).json({
          msg: error.message,
        });
      }
  }
}

module.exports = BrandController;
