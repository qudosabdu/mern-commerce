const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    try{
        const hashPassword = await bcrypt.hash(this.password, 12);
        this.password = hashPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})


const User = mongoose.model("User", userSchema);



module.exports = User;