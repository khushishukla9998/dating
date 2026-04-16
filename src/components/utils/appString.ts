const appString = {

  //============== MODAL =======================

  USER: "User",
  SETTING: "Setting",
  //=============== DATABASE====================

  DATABASE_CONNECT: "Database is connected",
  SERVER_RUNNING: "Server is running on",
  SERVER_ERROR: "Server error!",
  REGISTRATION_ERROR: "Registration error!",
  REGISTRATION_FAILED: "Registration failed!",
  REGISTRATION_SUCCESS: "User registrartion successfull",
  LOGIN_SUCCESS: "Login successsfull",
  LOGIN_FAILED: "Login failed ",
  USER_NOT_FOUND: "User not Found",
  WRONG_PASSWORD: "Password is invalid!",
  //===================TOKEN====================

  TOKEN_NOT_PROVIDED: "Token not provided!",
  REFRESH_TOKEN_MISSING: "Refresh token missing!",
  ACCESS_TOKEN_REFRESHED: "Access token refreshed",
  REFRESH_TOKEN_EXPIRE: "Refresh token expired, please login again!",
  INVALID_REFRESH_TOKEN: "Invalid refresh token!",
  INVALID_TOKEN_IN_REDISH: "Invalid or expired token in Redis!",
  INVALID_TOKEN: "Invalid or expired token!",
  TOKEN_EXPIRED: "Token expired",

  // =================REDIS======================

  REDIS_CONNECT: "Connected to Redis",
  REDIS_CLIENT_ERROR: "'Redis Client Error !'",
  REDIS_FAILED: "Failed to connect to Redis !",


  // ================= USER ======================

  USER_EXIST: "Admin already exists1",
  EMAIL_USE: "Email already in use!",
  DOCTOR_EXIST: "Doctor already exist",
  DOCTOR_REGISTER: "Doctor register successfully",
  DOCTOR_REGISTET_FAILED: "Doctor register error",
  VERIFY_EMAIL_FIRST: "FIRST VERIFY YOUR EMAIL",
  VERIFY_MOBILE_FIRST: "FIRST VERIFY YOUR MOBILE",
  DOCTOR_NOT_FOUND: "Doctor not Found",
  EMAIL_VERIFIED: "email is verified",
  EMAIL_OTP_REQUIRED: "email and OTP required",
  INVALID_OTP: "Otp invalid ",
  OTP_EXPIRED: " Your OTP is Expired ",


  MOBILE_NOT_FOUND: "  Mobile No. is not found ",

  OTP_SENT_SUCCESS: "OTP sent successfully",
  OTP_SEND_FAILED: "OTP send failed",
  MOBILE_VERIFIED: "mobile no. is verified",
  MOBILE_OTP_REQUIRED: "mobile no. and OTP required",
  MOBILE_NUMBER_REQUIRED: "mobile no. is required",
  WAIT_FOR_OTP_MOBILE: "please wait before rquesting new otp ",
  INVALID_MOBILE_FORMAT: "Invalid Indian mobile number format. Please provide a 10-digit number.",
  OTP_FAILED_CONTACT: "Failed to send OTP, please verify your phone number or contact support.",

  PASSWORD_MISMATCH: "New password and Confirm password do not match!",
  PASSWORD_MATCH: "New password should not be same as Old password",
  OTP_NOT_VERFIFIED: " Otp not verified",
  OTP_VERIFIED: "Youre OTP is verified",
  INCORRECT_OLD_PASSWORD: "Old password is incorrect",
  PAASWORD_RESET_SUCCESS: "Password reset successfully",
  PASSWORD_RESET_FAILED: "Password reset failed",

  // ================= STEPS ======================
  STEP_NUMBER_REQUIRED: "stepNumber is required (e.g. 1 to 10)",
  STEP_SETTING_NOT_FOUND: "Step setting not found",
  STEP_RULES_MISSING: "Step rules configuration missing for ",
  STEP_FIELD_REQUIRED: "Field is required: ",
  STEP_UPDATED_SUCCESSFULLY: "Step updated successfully",
  STEPS_CONFIG_UPDATED: "Steps updated",
  // ================= LIKES & MATCHES =================
  INVALID_USER_ID: "Invalid user ID",
  LIKED_USER_NOT_FOUND: "Liked user not found",
  ACTION_PROCESSED_SUCCESSFULLY: "Action processed successfully",
  MATCHES_FETCHED_SUCCESSFULLY: "Matches fetched successfully",

  // ================= GENERAL / VALIDATION =================
  ALL_FIELDS_REQUIRED: "All fields (including confirmPassword) are required",
  EMAIL_PASSWORD_REQUIRED: "Email and Password required",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  UNAUTHORIZED_USER_ID_MISSING: "Unauthorized: User ID missing",
  SETTING_ID_MISSING: "Setting ID missing in body",
  SETTING_NOT_FOUND: "Setting not found",
  STEP_NOT_ALLOWED: "Step not allowed or does not exist in this setting.",
  COMPLETE_PREVIOUS_STEP: "Please complete the previous step before proceeding.",

  // ================= PROFILE =================
  PROFILE_UPDATED_SUCCESSFULLY: "Profile updated successfully",
  PROFILE_UPDATED_FAILED: "Profile update failed",
DATA_NOT_FOUND:"still you have not any data about likes , views and matches , No one acts on your profile yet ",
NO_LIKES_FOUND:'you have not any likes yet ',
NO_VIEW_FOUNDl:"No one has viewed your profile yet.",
LIKE_DATA:"DATA FETCHED",
NO_MATCHES_FOUND:"No matches found yet.",

SCHEDULE_ID_NOT_FOUND:"Schedule not found or you are not authorized to update it.",
SCHEDULE_UPDATED :"Schedule updated",
NOT_DATED:"YOU HAVE NOT DATED to eachOther without dating you can not rating !!"
}
export default appString
