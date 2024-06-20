const { Password_Hashed, matchPassword } = require("../helpers/authhelpers");
const UserModel = require("../model/UserModel");
const getUser = async (req,res)=>{
    try{

      const id = req.body.id;

      if(!id){
        return res.status(404).send({
          success : false,
          message : "User Are Not Exist"
        })
      }
      const user = await UserModel.findById(id);
      return res.status(200).send({
         success : true,
         message : "Succesfully Get User",
         user : {
            fname : user.fname,
            lname :  user.lname,
            email : user.email,
            phone : user.phone,
            address : user.address
         }

      })


    }catch(error){
      res.status(505).send({
          success: false,
          message: "Somenthing Wrong",
          error
        });
    }
  }

  //______________** Update a User ** _____________//
  const updateUser = async(req,res)=>{
    try{

      const id = req.body.id;

      if(!id){
        return res.status(404).send({
          success : false,
          message : "User Are Not Exist"
        })
      }

      const {fname , lname  , phone , address , answer } = req.body;

      const user = await UserModel.findByIdAndUpdate(id , {
        fname : fname ,
        lname : lname ,
        phone : phone ,
        address : address,
        answer : answer
      })

      if(user){
        return res.status(202).send({
            success  : true ,
            message : "Succesfully Updated User"
        })
      }
    }catch(error){
      res.status(505).send({
        success: false,
        message: "Somenthing Wrong",
        error
      });
    }
  }


  //Resret password

  const resetPassword = async(req,res)=>{
    try{

      const id = req.body.id;
      const {password , newpassword} = req.body;

      //validation

      if(!password){
        return res.send({ message : "The Old PAssword is Required"})
      }
      if(!newpassword){
        return res.send({ message : "The New PAssword is Required"})
      }

      const user = await UserModel.findById(id);

         const is_match = await matchPassword(password , user.password );

         if(!is_match){
           return res.status(404).send({
              success : false,
              messsage : "The Old Password is Wrong"
           })
          }
        //password hash
        const hashpassword = await Password_Hashed(newpassword);

         await UserModel.findByIdAndUpdate(id , {
          password : hashpassword
         })

         return res.status(202).send({
          success  : true ,
          message : "Password is reset Succesfully"
         })


    }catch(error){
      res.status(505).send({
        success: false,
        message: "Somenthing Wrong",
        error
      });
    }
  }



  module.exports = {
    getUser,
    updateUser,
    resetPassword
  }