

const jwt = require("jsonwebtoken");

const JWT_SECRET = "gnergrigheirg748327bhrbebfr()foeihb!"

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const mongoUrl = "mongodb+srv://manoj:manoj@cluster0.owisi19.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl,{
  useNewUrlParser : true,
}).then (() => {
  console.log("connected to the database"); 
})
.catch((e) => {
  console.log(e);
});
var nodemailer = require("nodemailer")
require("./UserDetails")
// making the register api
const User = mongoose.model("UserInfo");
app.post("/register", async(req, res) => {
  const {fname, lname, email, password} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const OldUser = await User.findOne({email})
    if(OldUser){
      return res.send({error : "User Exists"});
    }
    await User.create({
      fname,
      lname, 
      email, 
      password : encryptedPassword,
    });
    res.send({status : "ok"});
  } catch (error) {
    res.send({status : "error"});
  }
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user) {
    return res.json({error : "User not found"});
  }
  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({}, JWT_SECRET);

    if(res.status(201)) {
      return res.json({userid:user._id,status : "ok", data : token});
    }else{ 
      return res.json({error : "error"});
    }
  }
  res.json({status : "error", error : "Invalid Password"});
});

app.get("/register",async(req,res)=>{
    try{
        const coll = await User.find() ;
        return res.json(coll);
    }catch(e){
        return res.json(e);
    }
})

 require("./Userreview")

const review = mongoose.model("Review");
app.post("/addreview", async(req, res) => {
  const {comment,userid, productid, positive, negative, neutral} = req.body;
  try {
    // const OldUser = await User.findOne({email})
    // if(OldUser){
    //   return res.send({error : "User Exists"});
    // }
    await review.create({
      comment,userid , productid, positive, negative, neutral
    });
    res.send({status : "ok"});
  } catch (error) {
    console.log(error)
    res.send({status : "error"});
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:3001/reset-password/${oldUser._id}/${token}`;
    //sendMail(link);
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manojkumarb.cs20@rvce.edu.in",
        pass: "#M@no!27.30",
      },
    });

    const details = {
      from: "manojkumar.bellatti@gmail.com",
      to: "kunalsatishm.cs20@rvce.edu.in",
      subject: "Password Reset link",
      text: link,
    };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("not sent");
      } else {
        console.log("email sent!");
      }
    });
    console.log(link);
  } catch (error) {}
});

app.post("/sendconfirmation", async (req, res) => {
  // const { email } = req.body;
  // try {
  //   const oldUser = await User.findOne({ email });
  //   if (!oldUser) {
  //     return res.json({ status: "User Not Exists!!" });
  //   }
  //   const secret = JWT_SECRET + oldUser.password;
  //   const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
  //     expiresIn: "5m",
  //   });
  //   const link = `http://localhost:3001/reset-password/${oldUser._id}/${token}`;
    //sendMail(link);
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const details = {
      from: "manojkumar.bellatti@gmail.com",
      to: "kunalsatishm.cs20@rvce.edu.in",
      subject: "Confirmation of Order",
      text: "Thank you for Shopping with us! Will deliver your order soon! Happy Shopping!",
    };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("not sent");
      } else {
        console.log("email sent!");
      }
    });
    //console.log(link);
    res.json({status:"Success"});
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.listen(3001,() => {
  console.log("server connected!");
});