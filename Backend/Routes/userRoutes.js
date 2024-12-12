const express = require("express");
const router = express.Router();
// const user = require("../model/User_");
const userController = require("../Controllers/userController");

const {
  verifyToken,
  deleteUser,
  updateUser,
  getUser,
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  validateOTP,
  newPassword,
  setVotes,
  setVote,
} = userController;
//middleware that is specific to this router
router.use(express.Router());
// multer
const multer = require("multer");

// set u disk storage  for multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./useruploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.name}` + `-` + Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

multer({ dest: "./useruploads" });

//................................................................to  get users
router.get("/get", getUser);

// .................................................................to delete
router.delete("/delete", deleteUser);
//...................................................................to update user

router.put("/update", upload.single("image"), updateUser);

//.......................................setall votes to false
router.put("/setvotes", setVotes);

//..........................................set one vote to true

router.put("/setvote", setVote);

// ................................................................to register user

router.post("/register", upload.single("image"), registerUser);

//.....................................................................user login
router.post("/login", loginUser);

//..................................................................change password

router.post("/changepassword", changePassword);

//..................................................................forgot password

router.post("/forgotpassword", forgotPassword);

// .................................................................//validate otp
router.post("/validateotp", validateOTP);

// .......................................add new password after otp verification
router.post("/newpassword", newPassword);

module.exports = router;
