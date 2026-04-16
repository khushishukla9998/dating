
import twilio from "twilio";
import config from "../../../config/dev.json";

const client = twilio(config.TWIILIO_SID, config.TWILIO_AUTH_TOKEN);


const sendOtp = async (mobileNo:string, otp:number) => {
  return client.messages.create({
    body: `Your OTP is ${otp}`,
     from:config.TWILIO_PHONE, 
    to: mobileNo,
  });
};

const sendPanicMessage = async (mobileNo:string, message:string) => {
  return client.messages.create({
    body: `Your OTP is ${message}`,
     from:config.TWILIO_PHONE, 
    to: mobileNo,
  });
};

export default {sendOtp,sendPanicMessage}
