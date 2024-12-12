const express = require("express");
const router = express.Router();
// const user = require("../model/User_");
const candidatesController = require("../Controllers/candidatesController");

const {
  deleteCandidate,
  getCandidates,
  registerCandidate,
  updateCandidate,
  setCounts,
  //  setCount
} = candidatesController;
//middleware that is specific to this router
router.use(express.Router());
// multer
const multer = require("multer");

// set u disk storage  for multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./candidateuploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.name}` + `-` + Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

multer({ dest: "./candidateuploads" });

//................................................................to  get
router.get("/get", getCandidates);

//........................................................ set all  counts 0

router.put("/setcounts", setCounts);

//.......................................................set one count +1
// router.put("/setcount", setCount);

// ..............................................................to delete
router.delete("/delete", deleteCandidate);

// .........................................................to register user

router.post("/register", upload.single("image"), registerCandidate);

//......................................................... to update
router.put("/update", upload.single("image"), updateCandidate);

module.exports = router;
