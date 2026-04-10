import userController from '../user/controller/userController'
import SettingController from '../user/controller/settingController'
import  StepController from '../user/controller/stepController'

const routeArray = [


  //============= user =============//
  {
    path: "/registerUser",
    method: "post",
    controller: userController.register,
    isPublic: true,

  },
   {
    path: "/loginUser",
    method: "post",
    controller: userController.userLogin,
    isPublic: true,

  },

   {
    path: "/verifyOtp",
    method: "post",
    controller: userController.verifyEmailOtp,

  },

   {
    path: "/forgotPassword",
    method: "post",
    controller: userController.fotgotPassword,
  },

     {
    path: "/resetPassword",
    method: "post",
    controller: userController.resetPassword,
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
  },
]
export default routeArray