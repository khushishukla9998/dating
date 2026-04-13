
import twilio from "twilio";
import config from "../../../config/dev.json";

const client = twilio(config.TWIILIO_SID, config.TWILIO_AUTH_TOKEN);

const sendOtp = async (mobileNo:string, otp:number) => {
  return client.messages.create({
    body: `Your OTP is ${otp}`,
  // messagingServiceSid: config.MESSAGING_SERVICE_SID,
     from:config.TWILIO_PHONE, 
    to: mobileNo,
  });
};

export default sendOtp
