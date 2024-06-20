const  bcrypt = require('bcryptjs')
const Password_Hashed = async (password)=>{
    try{
      const hpassword = await bcrypt.hash(password , 10 );
      return hpassword
    }catch(error){
        console.log(error)
    }
}

const matchPassword = async (password , hashpassword)=>{
    try{
        return await bcrypt.compare(password , hashpassword)
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    Password_Hashed,
    matchPassword
}