const { admin } = require("../model/User_");
const bcrypt = require("bcrypt");
require('dotenv').config();

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const adminData = await admin.findOne({ email });
    if (!adminData) {
      console.log("Admin not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare provided password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, adminData.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Admin fetched successfully:", adminData.name, adminData.email);
    res.status(200).json({
      message: "Admin fetched successfully",
      data: { name: adminData.name, email: adminData.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExist = await admin.findOne({ email: email });

    if (userExist) {
      console.log("Admin already exists with email:", email);
      res.status(400).json({ message: "Admin already exists" });
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
      console.log("Hash password:", hashPassword);

      const newAdmin = new admin({
        name: name,
        email: email,
        password: hashPassword,
      });

      await newAdmin.save().then((admindata) => {
        console.log(`Admin registered with this email: ${email}`);
        res.status(200).json({
          status: 200,
          message: "Admin registered successfully",
          data: admindata,
        });
      });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Error registering admin" });
  }
};

// Change Password
const changePassword = async (req, res) => {
  const email = req.body.email;
  const loginAdmin = await admin.findOne({ email: email }, "+password ");
  const password = loginAdmin.password;

  if (!loginAdmin) {
    res.status(400).json({ message: "User not found" });
    console.log("User not found with email");
  } else {
    const oldPassword = bcrypt.hashSync(req.body.old_password, 10);

    if (password !== oldPassword) {
      console.log("Wrong password");
      res.status(400).json({ message: "Wrong old password" });
    } else {
      const { new_password, confirm_password } = req.body;

      if (new_password !== confirm_password) {
        console.log("Confirm password mismatched");
        res.status(400).json({ message: "Confirm password mismatched" });
      } else {
        const newHash = bcrypt.hashSync(new_password, 10);
        admin
          .updateOne({ email: email }, { password: newHash })
          .then(() => {
            console.log("User password updated");
            res.status(200).json({
              status: 200,
              message: "Password changed successfully",
            });
          })
          .catch((e) => console.error(e.message));
      }
    }
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  changePassword,
};
