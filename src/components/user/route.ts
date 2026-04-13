import userController from '../user/controller/userController'
import SettingController from '../user/controller/settingController'
import StepController from '../user/controller/stepController'
import likeController from '../user/controller/likeController'
import validation from './validation'

const upload = require("../../middelware/upload");

const routeArray = [
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



  //===== steps create

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

  //======= matches
      {
    path: "/matches",
    method: "post",
    controller: likeController.like,
  },


]





export default routeArray