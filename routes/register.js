var express = require("express");
var router = express.Router();
var { getMainCollection } = require("../database/connect");

router.get("/register", function (req, res) {
  res.render("register", { error: null, message: null });
});

router.post("/register", async function (req, res) {
  var username = (req.body.username || "").trim();
  var password = (req.body.password || "").trim();

  if (!username || !password) {
    return res.status(200).render("register", {
      error: "Username and password cannot be empty.",
      message: null
    });
  }

  try {
    var collection = await getMainCollection();
    var existing = await collection.findOne({
      docType: "user",
      username: username
    });

    if (existing) {
      return res.status(200).render("register", {
        error: "Username is already taken. Please choose another.",
        message: null
      });
    }

    await collection.insertOne({
      docType: "user",
      username: username,
      password: password, // no hashing required for this course
      wantToGoList: []
    });

    res.redirect("/login?registered=1");
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).render("register", {
      error: "An error occurred while registering. Please try again.",
      message: null
    });
  }
});

module.exports = router;
