const express = require("express");
const app = express();
const userRoute = require("./Routes/userRoutes");
const adminRoute = require("./Routes/adminRoutes");
const resultRoute = require("./Routes/resultsRoutes");
const candidateRoute = require("./Routes/candidateRoutes");
const { contact } = require("./model/User_");

require("./database");
require("dotenv").config();

//cors
const cors = require("cors");

app.use(cors());

const port = process.env.PORT || 3000;

//parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("candidateuploads"));
app.use(express.static("useruploads"));

app.get("/", function (req, res) {
  res.send("HELLO,WE ARE USING EXPRES");
});

// ............................routes
app.use("/users", userRoute);
app.use("/admin", adminRoute);
app.use("/candidates", candidateRoute);
app.use("/polling", resultRoute);
//............................registering user queries
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, query } = req.body;
    const newContact = new contact({ name, email, phone, query });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting contact form", error });
  }
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
