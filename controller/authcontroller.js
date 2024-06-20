const { hash } = require("bcryptjs");
const { Password_Hashed, matchPassword } = require("../helpers/authhelpers");
const UserModel = require("../model/UserModel");
const jwt = require('jsonwebtoken')

//_____________^^ Ragister ^^______________//
const ragister = async (req, res) => {
  try {
    const { fname, lname, email, password, phone, address , answer } = req.body;

    //validation
    if (!fname) {
      return res.send({ message: "fname is Required" });
    }
    if (!lname) {
      return res.send({ message: "lname is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }
    if (!answer) {
      return res.send({ message: "address is Required" });
    }


    //Email check

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(203).send({
        success: false,
        message: "The Email is Already Ragistered Try Login",
      });
    }

    //password hashing
    const hashpassword = await Password_Hashed(password);

    //store
    await UserModel.create({
      fname,
      lname,
      email,
      password: hashpassword,
      phone : phone,
      address : address,
      answer
    });

    return res.status(201).send({
        success : true,
        message : "User Ragistered Succesfully"
    })


  } catch (error) {
    res.status(505).send({
      success: false,
      message: "Somenthing Wrong",
    });
  }
};

//_____________^^ Login ^^______________//

const login = async (req,res)=>{
    try {

        const {email , password } = req.body;

        //validation

        if(!email || !password){
            res.status(404).send({
                success : false,
                message : "The Email And Password Is Wrong"
            })
        }

       const user = await UserModel.findOne({email : email})
       if(!user){
        res.status(404).send({
          success : false,
          message : "The Email Is Not Ragistered"
        })
       }

       const match =  await matchPassword(password , user.password);

       if(!match){
        return res.status(404).send({
            success : false,
            message : "The Password is Wrong"
        })
       }

       //token generates
       const token = jwt.sign({id : user._id} , process.env.JWTSECRET);

       return res.status(200).send({
         success : true,
         message : "Login Succesfully",
         user : {
            fname : user.fname,
            lname : user.lname,
            email : user.email,
         },
         token
       })

    } catch (error) {
        console.log(error)
        res.status(505).send({
            success: false,
            message: "Somenthing Wrong",
          });
    }
}

//____________** Forgot PAssword ** __________//
const ForgotPassword =  async (req,res)=>{
  try{

      const { email , answer , newpassword } = req.body;

      //validation
      if (!email) {
           res.send({ message: "Email is Required" });
        }
        if (!answer) {
           res.send({ message: "Answer is Required" });
        }
        if (!newpassword) {
           res.send({ message: "New Password is Required" });
        }


      const user = await UserModel.findOne({email , answer});
      if(!user){
          return res.status(404).send({
              success : false,
              message : "Email Or Answer is Wrong"
          })
      }

      //password hash
      const hpassword = await Password_Hashed(newpassword);
      const is_forgot = await UserModel.findByIdAndUpdate(user._id , {
          password : hpassword,
      });

      if(is_forgot){
          return res.status(200).send({
              success : true,
             message : "Password Suceesfully Forgot"
          })
      }
  }catch(error){
     return res.status(505).send({
          success: false,
          message: "Somenthing Wrong",
          error
        });
  }
}



module.exports = {
    ragister,
    login,
    ForgotPassword
}