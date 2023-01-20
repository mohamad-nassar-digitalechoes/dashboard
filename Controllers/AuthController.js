const Admin = require("../Models/Admins");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Admin.findOne({email:email,status:"active"});
      if (!user)
        return res.status(400).json({
          msg: "Email or password incorrect",
        }); 
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user.id }, "admin-token");
        return res.status(200).json({
          msg: "Authorized",
          "access-token": token,
          "role":user.type
        });
      } else
        return res.status(400).json({
          msg: "Email or password incorrect",
        });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { first_name, last_name, email, password, type, status } = req.body;
      const exist = await Admin.findOne({ email });
      if (exist) {
        return res.status(400).json({
          msg: "Email already in use.",
        });
      }
      const hashed = await bcrypt.hash(password, 8);
      let admin = new Admin({
        first_name,
        last_name,
        email,
        type,
        status,
        password: hashed,
      });
      await admin.save();
      return res.status(200).json({
        msg: "Admin has been created successfully",
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const admin_id = req.body.id;
      var admin = await Admin.findOneAndUpdate(
        { _id: admin_id },
        { $set: req.body }
      );
      return res.status(200).json({
        msg: "Admin has been updated successfully.",
        admin: admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async info(req, res) {
    try {
      const token = req.header("admin-token");
      const verification = jwt.verify(token, "admin-token");
      const admin = await Admin.findById({ _id: verification.id });
      return res.status(200).json({
        admin: admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg:error.message
      })
    }
  }

  static async alladmins(req, res) {
    try {
      const token = req.header("admin-token");
      const verification = jwt.verify(token, "admin-token");
      if(verification){
        const role=await Admin.findById({_id:verification.id});
        if(role.type!="Admin")
        return res.status(405).json({
          msg: "No access",
        });
      }
      const admin = await Admin.find({type:"Admin"});
      return res.status(200).json({
        admins: admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg:error.message
      })
    }
  }

  static async allagency(req, res) {
    try {
      const token = req.header("admin-token");
      const verification = jwt.verify(token, "admin-token");
      const admin = await Admin.find({type:"Agency"});
      return res.status(200).json({
        agencies: admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg:error.message
      })
    }
  }

}

module.exports = AuthController;