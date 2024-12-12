const { candidate } = require("../model/User_");
require("dotenv").config();

//................delete user
const deleteCandidate = async (req, res) => {
  // res.send("user data deleted");
  const { email } = req.body;
  await candidate
    .deleteMany(email && { email: email })
    .then(() => {
      console.log("candidate deleted");
      res.json({
        message: "candidate deleted",
        status: "200",
      });
    })
    .catch((e) => console.error(err.message));
};

//................getcandidate
const getCandidates = async (req, res) => {
  const email = req.body.email;
  await candidate
    .find(email && { email: email })
    .then((data) => {
      console.log(data);
      res.json({
        status: "200",
        message: "candidate fetched ",
        data: data,
      });
    })

    .catch((e) => {
      console.log("error message");
    });
  // console.log(data)
};

//  update candidate

const updateCandidate = async (req, res) => {
  const {prevemail, email, party, name } = req.body;
  const image=req.file.filename;
  const isUser =  prevemail!=email&&(await candidate.findOne({ email: email }));
  
  if (!isUser) {
    await candidate
      .findOneAndUpdate(
        { email: req.body.prevemail},
        { email: email, image: image, party: party, name: name,counts:0 }
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

//................... set counts to zero
const setCounts = async (req, res) => {
try{  const{email}=req.body
if(email){

  await candidate.findOneAndUpdate({email:email}, { $inc: { count: 1 } });
  res.json({ message: "Counts updated", status: "200" });
}
else{
  
  await candidate.updateMany({}, { $set: { count: 0 } });
  res.json({ message: "Counts updated", status: "200" });
}}


  catch (err) {
    console.error(err);
    res.json({ message: "Error updating counts", status: "500" });
  }
};

//................... set count to plus one
// const setCount = async (req, res) => {
//   const {email}=req.email
//   try {
//     await candidate.findOneAndUpdate({ email:'shekharsharma7206@gmail.com' }, { $inc: { count: 1 } });
//     res.json({ message: "voting successful ", status: "200" });
//   } catch (err) {
//     console.error(err);
//     res.json({ message: "Error in voting", status: "500" });
//   }
// };

//..............regiser user or insert

const registerCandidate = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, name, party } = req.body;
    console.log(req.file);
    const userExist = await candidate.findOne({ email: email });
    if (userExist) {
      console.log("user already exits with email");
      res.json({ message: "user already exists", status: "400" });
    } else {
      const newCandidate = new candidate({
        name: name,
        email: email,
        image: req.file.filename,
        party: party,
        count: 0,
      });
      await newCandidate.save().then((candidatedata) => {
        console.log(`candidates registered with this mail:${email}`);
        //  res.send('user data insserted')
        res.json({
          status: 200,
          message: "candidates registered ",
          data: candidatedata,
        });
      });
    }
  } catch (e) {
    console.error(e.message);
  }
};

//export controller
module.exports = {
  deleteCandidate,
  getCandidates,
  registerCandidate,
  updateCandidate,
  setCounts,  //for all candidates setcount to zero
  // setCount // for one candidate inc by one

};
