const {user} = require("../model/User_");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt =require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   service:'gmail',
//   port: 465,
//   secure:true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//     }
//     });




//.....................for verify token
const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, '12345678'); // Use the same secret key as used in signing

    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};


//................delete user
const deleteUser = async (req, res) => {
  // res.send("user data deleted");
  const {email}=req.body
  await user.findOneAndDelete({email:email}).then(()=>{
    res.json({
      message:"user deleted",
      status:'200'
    })
  }).catch((e)=>console.error(err.message))
};
//......................get user 
const getUser = async (req, res) => {
  const { email } = req.query;
  console.log(email)
  console.log('Searching for user with email:', email);
  await user
    .find(email&&{ email: email })
    .then((data) => {
      console.log('Found user:', data);
      res.json({
        status: 200,
        message: "User fetched",
        data: data,
      });
    })
    .catch((e) => {
      console.error('Error fetching user:', e.message);
      res.json({
        status: "500",
        message: "Error fetching user",
        data: [],
      });
    });
};

//.............. update user

const updateUser = async (req, res) => {
  const {prevemail, email, name, phone,password} = req.body;
  const isUser =  prevemail!=email&&(await user.findOne({ email: email }));
  
  if (!isUser) {
    await user
      .findOneAndUpdate(
        { email: req.body.prevemail},
        { email: email, image:req.file.filename, name: name,phone:phone,password: password }
      )
      .then((data) => {
        res.json({ message: "Candidate Updated", status: "200" });
      })
      .catch((err) => console.error(err));
  }
  else{
    res.json({message:'cant update user',
   status:400})
  }
};

//.....................set  all  voter  to false
const setVotes = async (req, res) => {
  try {
    await user.updateMany({}, { $set: { voted:false } });
    res.json({ message: "Votes reseted !!!", status: "200" });
  } catch (err) {
    console.error(err);
    res.json({ message: "Error error resetting votes", status: "500" });
  }
};

// ............................setone  vote to true

const setVote = async (req, res) => {
  const {email}=req.body
  console.log(email)
  try {
    await user.findOneAndUpdate({email}, {voted:true});
    res.json({ message: "Voting successfull", status: "200" });
    //mail 
    const mailOptions = {
      from: process.env.EMAIL ,
      to: email,
      subject: 'Sending Email using Node.js',
      text: `Voting Sucessfull !!!! on E-Vote. \n If not you then complain on this : link (only for testing purpose ignore this mail)`
      };

    // transporter.sendMail(mailOptions,function(err,info){
    //   if(err){
    //     console.log(err);
    //     }else{
    //       console.log(info);
    //     }
    // })
  } catch (err) {
    console.error(err);
    res.json({ message: "Voting failed", status: "500" });
  }
};


//..............regiser user or insert

const registerUser = async (req, res) => {

  const {name, email, phone,password ,address} = req.body;
 
  const userExist = await user.findOne({ email: email });
if(userExist){
  console.log("user already exits with email:",email)
  res.json({message:'user already exists',
  status:'400'
})}
else{
  const hashPassword = bcrypt.hashSync(password, 10);
  
  console.log(req.file)
  console.log(req.body)
  const newUser = new user({
    name: name,
    email: email,
    phone: phone,
    password: hashPassword,
    address:address,
    image:req.file.filename,
    voted:false,
  });
  await newUser
    .save()
    .then((userdata) => {
   

      
      console.log(`user registered with this mail:${email}`)
      
      res.json(
        {
        status: 200,
        message: "user registered ",
        data: userdata,
      }
  
      );
      const mailOptions = {
        from: process.env.EMAIL ,
        to: email,
        subject: 'Sending Email using Node.js',
        text: `user registered with mail :${email} on E-Vote platform ,if not you complain here ..link (for testing purpose only do not consider or response) `
        };
  
      // transporter.sendMail(mailOptions,function(err,info){
      //   if(err){
      //     console.log(err);
      //     }else{
      //       console.log(info);
      //     }
      // })
    })}

};

//.............................login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  console.log(email)
  try {
    const loginUser = await user.findOne({ email: email });
    if (!loginUser) {
      console.log("Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password", status: "400" });
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      console.log("Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password", status: "400" });
    }

    console.log("User fetched:\n", loginUser.name, "\n", loginUser.email);

    // JWT token
    const payload = {
      id: loginUser._id,
      name: loginUser.name,
      email: loginUser.email,
    };

    jwt.sign(payload, '12345678', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Token generation failed" });
      }
      res.status(200)
      res.json({
        token: token,
        payload: payload,
        login: true,
        message:"User logged in"
      });

      const mailOptions = {
        from: process.env.EMAIL ,
        to: email,
        subject: 'login alert',
        text: `login observed , if not you then complain to this no. 99998888XX (ignore its only for testing purpose )`
        };
  
      // transporter.sendMail(mailOptions,function(err,info){
      //   if(err){
      //     console.log(err);
      //     }else{
      //       console.log(info);
      //     }
      // })

    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//......................change password

const changePassword = async (req, res) => {
  const email = req.body.email;
  const loginUser = await user.findOne({ email: email }, "+password ");
  const password = loginUser.password;
  console.log(req.body);
  console.log("oldhash:", password);

  const old_password = bcrypt.hashSync(req.body.old_password, 10);

  if (!loginUser) {
    res.json({
      status: 400,
      message: "user not found",
    });
    console.log("user not found with email");
  } else {
    if (password != old_password) {
      console.log("wrong password");
      res.json({
        status: 200,
        message: "wrong old password",
      });
    } else {
      const { new_password, confirm_password } = req.body;
      if (new_password != confirm_password) {
        console.log("confirm password mismatched");
        res.json({
          status: 200,
          message: " confirm password miss matched",
        });
      } else {
        const newhash = bcrypt.hashSync(req.body.new_password, 10);
        user
          .updateOne({ email: email }, { password: newhash })
          .then((data) => {
            console.log("user password updated ");
            console.log("newhash:", newhash);
            res.json({
              status: 200,
              message: "password changed ",
             
            });
            const mailOptions = {
              from: process.env.EMAIL ,
              to: email,
              subject: 'Sending Email using Node.js',
              text: `Password changed successfully for E-Vote. \n If not you then complain on this : link (only for testing purpose ignore this mail)`
              };
        
            // transporter.sendMail(mailOptions,function(err,info){
            //   if(err){
            //     console.log(err);
            //     }else{
            //       console.log(info);
            //     }
            // })
          })
          .catch((e) => console.error(e.message));
      }
    }
  }
};

//.......................forgot password
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const forgotUser = await user.findOne({ email: email });
  
  if (!forgotUser) {
    console.log("user not found with email");
    res.json({
      status: "fail",
      message: "user not found with email",
    });
  } else {
   const otp = Math.floor(1000 + Math.random() * 9000); //use bcrypt
    console.log(`otp to mail: ${otp}`);
    forgotUser.otp = bcrypt.hashSync(otp.toString(),10);
    forgotUser
      .save()
      .then((data) => {
        // console.log("otp sent ", data.email);
        res.json({
          status: "200",
          message: `otp :${otp}`,
          data: data.email,
        });
        const mailOptions = {
          from: process.env.EMAIL ,
          to: email,
          subject: 'Sending Email using Node.js',
          text: `OTP : ${otp} for password change on EVOTE platform ,\n if not please complain : link  (only for testing purpose ignore this mail)`
          };
    
        // transporter.sendMail(mailOptions,function(err,info){
        //   if(err){
        //     console.log(err);
        //     }else{
        //       console.log(info);
        //     }
        // })
      })
      .catch((e) => console.error(e.message));
  }
};

//........................validate OTP
const validateOTP = async (req, res) => {
  const email = req.body.email;
  const correctOtp = await user.findOne({ email: email }, "+otp,+email");
  const userOtp = bcrypt.hashSync(req.body.otp,10);
  if (correctOtp) {
    correctOtp.otp == userOtp
      ? (correctOtp.otp=bcrypt.hashSync("0",10),
     await correctOtp.save(),
        // console.log("otp matched"),
        res.json({
          status:200,
          message: "otp matched ",

        }))
      : (console.log("wrong otp"),
        res.json({
          status: 400,
          message: "otp didnt matched ",
        }));
  } else{ res.json({status:400,
    message:'user not registered with that mail'
  })}
};

//.................new password after otp verification
const newPassword = async (req, res) => {
  const email = req.body.email;
  const { new_password} = req.body;
  const loginUser = await user.findOne({ email: email }, "+password ");

  console.log(req.body);

  if (!loginUser) {
    res.json({
      status: 400,
      message: "user not found",
    });
    console.log("user not found with email");
  } else  {
      const newhash = bcrypt.hashSync(new_password, 10);
      user
        .updateOne({ email: email }, { password: newhash })
        .then((data) => {
          console.log("user password updated ");
          res.json({
            status: 200,
            message: "password changed ",
            data:data.data
          },
          );
          const mailOptions = {
            from: process.env.EMAIL ,
            to: email,
            subject: 'Sending Email using Node.js',
            text: `Password changed successfully for E-Vote. \n If not you then complain on this : link (only for testing purpose ignore this mail)`
            };
      
          // transporter.sendMail(mailOptions,function(err,info){
          //   if(err){
          //     console.log(err);
          //     }else{
          //       console.log(info);
          //     }
          // })
        })
        .catch((e) => console.error(e.message));
    }
  
};

//export controller
module.exports = {
  deleteUser,
  getUser,
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  validateOTP,
  newPassword,
  updateUser,
  verifyToken,
  setVotes, // all users to false
  setVote, // to one user to true 
 
};
