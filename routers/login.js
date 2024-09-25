const express = require("express");
const router = new express.Router();
const { member } = require("../models/db");
router.use(express.json());

//-----------Signup-----------

router.post("/signup", async (req, res) => {
  let status = "error";
  let message = "Someting went wrong , try again";
  let reqStatus = 400;
  let inserted_id = undefined;

  const validateUser = [];

  if (!req.body?.firstName) {
    validateUser.push("firstName field is reqired");
  }
  if (!req.body?.lastName) {
    validateUser.push("lastName field is reqired");
  }
  if (!req.body?.email) {
    validateUser.push("email field is reqired");
  }
  if (!req.body?.password) {
    validateUser.push("Passworg is required");
  }
  if (validateUser.length > 0) {
    res.status(reqStatus);
    return res.status(400).json({ message: validateUser, status });
  }

  try {
    const register = await new member(req.body).save();
    if (register) {
      status = "success";
      message = "User added successfully!";
      reqStatus = 200;
      inserted_id = register?._id;
    }
  } catch (e) {
    message = e;
  }
  return res
    .status(reqStatus)
    .json({ status, message, id: inserted_id, email: req.body.email });
});

//---------------Login-----------------------

router.post("/login", async (req, res) => {
  let status = "error";
  let message = "Someting went wrong , try again";
  let reqStatus = 400;
  const validateUser = [];

  if (!req.body?.email) {
    validateUser.push("email field is reqired");
  }
  if (!req.body?.password) {
    validateUser.push("Passworg is required");
  }
  if (validateUser.length > 0) {
    res.status(reqStatus);
    return res.status(400).json({ message: validateUser, status });
  }

  try {
    const Email = req.body.email;
    const Password = req.body.password;

    if (!Email || !Password) {
      return res.status(400).json({ error: "both field is require" });
    }

    const loginUser = await member.find(
      { email: Email } && { password: Password }
    );

    if (loginUser.length > 0) {
      res.status(200).json({
        message: "success",
        email: req.body.email /* loginUser[0]?.email*/,
      });
    } else {
      return res.status(400).json({ error: "Login details are invalide" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Login details are invalide" });
  }
});

module.exports = router;
