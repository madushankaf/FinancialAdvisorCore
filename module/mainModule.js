const lead =require("../dummyData/lead")
const login =require("../dummyData/login")


const getLeadRecords=async ()=>{
 return lead;
}

const getLogin=async ()=>{
    return login;
   }

module.exports={getLeadRecords, getLogin}