

const express = require('express');
const { success, error, validation } = require("../../../helpers/apiResponse");
const app = express();
//require('dotenv')
//const client = require('twilio')(process.env.accountSid, process.env.authToken);

//SendOtp

 const SendOtp =  async function (req, res){
    console.log("this is otp route")
    console.log(req.body)
    client.verify.services(process.env.ServiceSID)
      .verifications
      .create({to: `+${req.body.phoneNumber}`, channel: 'sms'})
      .then(verification => {
        console.log("status: "+ verification.status)
        res.status(200).json(success("Success otp send",
                                verification.status,
                                res.statusCode));
      })
      .catch(e => {
        console.log(e.message)
         if(e.message){
          res
          .status(422) 
          .json(validation("invalid phone number", 422));
         }
      });
      
} 

// verifyOtp

const verifyOtp = async (req, res) => {
    
    try{
      const check = await client.verify.services(process.env.ServiceSID)
      .verificationChecks
      .create({to: `+${req.body.phoneNumber}`, code: req.body.otp})
      .then(verification_check =>{
        console.log("status: "+ verification_check.status)
        console.log(verification_check)
        if(verification_check.status === "approved"){
          console.log(verification_check.status)

          res.status(200).json(success("Success otp approved",
                                verification_check.status,
                                res.statusCode));
        }
        /*
        if(verification_check.status === "canceled"){
          console.log("this is me canceled")
          console.log(verification_check.status)
          res
          .status(422) 
          .json(validation("Not a valid OTP OR The max attempts to check a code have been reached", 422));
        }
        if(verification_check.status === "pending"){
          console.log("this is me pending")
          console.log(verification_check.status)
          res
          .status(422) 
          .json(validation("pending!!!!!!    Not a valid OTP", 422));
        } 
        */
      })
      

    }catch(error) {
        res
        .status(422) 
        .json(validation("Number Not Found", 422));
      };
  
}


module.exports = {
    SendOtp,
    verifyOtp
}