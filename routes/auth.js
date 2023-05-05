const router = require("express").Router();
const User = require("./../models/User");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    //password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    password: req.body.password,

  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
  }
});

router.get("/register", async (req, res) => {
  // const collections =  Object.keys(mongoose.connection.collections)
  // console.log(collections)
  // res.status(200).json(collections)

  //await User.deleteMany()
  const ss = await User.find();
  console.log(ss);
  res.send({ss});
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne( {
      username : req.body.username
    });

    !user && res.status(401).json("wrong user");
    // const hashedPassword = CryptoJS.AES.decrypt(
    //   user.password,
    //   process.env.PASS_SEC
    // );
    // const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const originalPassword = user.password;
    console.log(originalPassword)
    const inputPassword = req.body.password;
    console.log(inputPassword)
    originalPassword != inputPassword && res.status(401).json("Wrong Password please correct");
    const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );
    const {password, ...others} = user._doc;
    res.status(200).json({...others, accessToken})

  } catch(err) {

  }

})

module.exports = router;
