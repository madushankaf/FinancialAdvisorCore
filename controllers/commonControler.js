const model= require("../module/mainModule");
const status= require('../config/status')
const login= async (req, res, next) => {
  try {
    const records=await model.getLogin();
    status.data=records;
    status.message="fetching succesfully";
    status.status=200;
    res.json(status)
  } catch (error) {
    res.json({
      error: "Error processing while reading collection",
      message: error.message,
    });
  }
};

const getLead = async (req, res, next) => {
  try {
    const records=await model.getLeadRecords();
    status.data=records;
    status.message="fetching succesfully";
    status.status=200;
    res.json(status);
  } catch (error) {
    res.json({
      error: "Error processing while reading collection",
      message: error.message,
    });
  }
};


const test = async (req, res, next) => {
    try {
      status.data="hello, i am test user";
      status.message="fetching succesfully";
      status.status=200;
      res.json(status);
    } catch (error) {
      res.json({
        error: "Error processing while reading collection",
        message: error.message,
      });
    }
  };
  

module.exports={
  test, 
  login,
  getLead
}