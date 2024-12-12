const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const { loginAdmin, registerAdmin, changePassword } = adminController;
router.post("/login", loginAdmin);

router.post("/register", registerAdmin);

router.post ("/changepassword",changePassword);

module.exports = router;
