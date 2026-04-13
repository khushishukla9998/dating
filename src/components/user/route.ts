import userController from '../user/controller/userController'
import SettingController from '../user/controller/settingController'
import StepController from '../user/controller/stepController'
import validation from './validation'
import { verifyAcessToken } from '../../middelware/index';
const upload = require("../../middelware/upload");

const routeArray = [

  //============= user =============//
// ... (skipping some routes for brevity if needed? No wait, this replaces the whole file if I'm not careful. I'll just target the exact chunks)


  //============= user =============//
  {
    path: "/registerUser",
    method: "post",
    controller: userController.register,
    validation: validation.registerValidation,
    isPublic: true,

  },
   {
    path: "/loginUser",
    method: "post",
    controller: userController.userLogin,
    validation: validation.loginValidation,
    isPublic: true,

  },

   {
    path: "/verifyOtp",
    method: "post",
    controller: userController.verifyEmailOtp,
    validation: validation.verifyOtpValidation,

  },

   {
    path: "/forgotPassword",
    method: "post",
    controller: userController.fotgotPassword,
    validation: validation.forgotPasswordValidation,
  },

     {
    path: "/resetPassword",
    method: "post",
    controller: userController.resetPassword,
    validation: validation.resetPasswordValidation,
  },



  //===== steps create (setting Controller)

      {
    path: "/createSteps",
    method: "post",
    controller: SettingController.createStep,
  },


   {
    path: "/fillSteps",
    method: "post",
    controller: StepController.fillStep,
    middleware: upload.any(),
    validation: validation.stepValidation,
  },
]
export default routeArray