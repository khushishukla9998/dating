import userController from '../user/controller/userController'
import SettingController from '../user/controller/settingController'
import StepController from '../user/controller/stepController'
import likeController from '../user/controller/likeController'
import validation from './validation'
import homeController from '../user/controller/homeController'
import postEntertainmentVideo from '../user/controller/entertainmentController'

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

  {
    path: "/editProfile",
    method: "put",
    controller: userController.editProfile,
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
    middleware: upload.array("images",10),
    validation: validation.stepValidation,
  },

  //======= matches
      {
    path: "/matches",
    method: "post",
    controller: likeController.like,
  },
  {
    path: "/homeScreen",
    method: "get",
    controller: homeController.homeScreen
  },,

  {
    path: "/likeData",
    method: "get",
    controller:likeController.getdetails
  },

    {
    path: "/scheduleDate",
    method: "post",
    controller:likeController.createSchedule
  },

   {
    path: "/dateResponse",
    method: "put",
    controller:likeController.handleScheduleRequest
  },

     {
    path: "/rating",
    method: "put",
    controller:likeController.rating
  },

     {
    path: "/postVedio",
    method: "post",
      middleware: upload.single("video"),
    controller:postEntertainmentVideo.postEntertainmentVideo
  },
]





export default routeArray