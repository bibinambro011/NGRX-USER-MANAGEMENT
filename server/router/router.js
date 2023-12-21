const express = require("express");
const router = express.Router();
const User = require("../user");
const Admin = require("../admin");
const upload = require("../middleware/multer");

const jwt = require("jsonwebtoken");

router.get("/getAll", async (req, res) => {
  let users = await User.find();
  if (users.length !== 0) {
    res.status(200).json(users);
  } else res.status(500);
});
router.get("/login", async (req, res) => {
  let username = req.query.username;
  let password = req.query.password;

  let user = await User.findOne({ name: username });
  // console.log(user,password);
  console.log(user);
  if (!user) {
    res.status(500).json({ status: false, message: "Login failed" });
  } else {
    if (user.password !== password) res.status(401).send("Invalid password");
    else {
      let payload = { subject: user.email, role: "user" };
      let token = jwt.sign(payload, "secretkey");
      res.status(200).send({ token });
    }
  }
});
router.get("/getLogProfile", verifyUserToken, async (req, res) => {
  console.log(req.userId);
  const username = req.userId;

  let user = await User.findOne({ email: username });

  if (!user) {
    res.status(500).json({ status: false, message: "Login failed" });
  } else {
    console.log(user);
    res.status(200).send({ user });
  }
});
router.get("/admin", async (req, res) => {
  let username = req.query.username;
  let password = req.query.password;

  let user = await Admin.findOne({ name: username });
  console.log(user, password);
  if (!user) {
    res.status(500).json({ status: false, message: "Login failed" });
  } else {
    if (user.password !== password) res.status(401).send("Invalid password");
    else {
      let payload = { subject: user.name, role: "admin" };
      let token = jwt.sign(payload, "secretkey");
      res.status(200).json({ token });
    }
  }
});
router.get("/getAll", verifyAdminToken, async (req, res) => {
  let users = await User.find();
  console.log(users);
  if (users.length !== 0) {
    res.status(200).json(users);
  } else res.status(500);
});
router.get("/duplicate", async (req, res) => {
  let username = req.query.username;
  // let password = req.query.password

  let user = await User.findOne({ email: username }, { password: 0, _id: 0 });
  console.log(user);
  res.status(200).json(user);
});
router.post("/edit", async (req, res) => {
  const newData = req.body.newData;
  const oldmail = req.body.oldMail;
  let user = await User.findOne({ email: oldmail });
  user.email = newData.email;
  user.name = newData.name;
  const upUser = await user.save();
  if (!upUser)
    res.status(500).json({ status: false, message: "Registration failed" });
  else {
    delete upUser._id;
    delete upUser.password;
    console.log(upUser);
    res.status(200).json(upUser);
  }
});
router.post("/upload", upload.single("image"), async (req, res) => {
  console.log("upload route get called");
  console.log(req.file);
  const img = req.file.filename;
  const email = req.body.email;
  let user = await User.findOne({ email: email }, { password: 0 });
  user.profile = img;
  await user.save();

  res.status(200).json(img);
});
router.delete("/delete", async (req, res) => {
  const email = req.query.email;
  console.log("email is==>", email);

  try {
    await User.deleteOne({ email: email });
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false });
  }
});

router.post("/register", async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  let user = new User(userInfo);
  let newUser = await user.save();
  if (!newUser)
    res.status(500).json({ status: false, message: "Registration failed" });
  else {
    delete newUser._id;
    delete newUser.password;
    res.status(200).json(newUser);
  }
});
function verifyUserToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, "secretkey");
    if (!payload) return res.status(401).send("Unauthorized request");
    if (payload.role !== "user")
      return res.status(401).send("Unauthorized request");
    console.log(payload.role);
    console.log(typeof payload.role);

    req.userId = payload.subject;
    next();
  } catch (error) {
    console.log(error);
  }
}
function verifyAdminToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized request");
    }
    // console.log(token,'>>>>>>>>>>>>>>>>>>>>>>',req.headers.authorization)
    let payload = jwt.verify(token, "secretkey");
    if (!payload) return res.status(401).send("Unauthorized request");
    if (payload.role !== "admin")
      return res.status(401).send("Unauthorized request");
    console.log(payload.role);
    console.log(typeof payload.role);
    req.userId = payload.subject;
    next();
  } catch (error) {
    console.log(error);
  }
}
module.exports = router;
