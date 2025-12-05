var express = require("express");
var router = express.Router();
var { getMainCollection } = require("../database/connect");

router.get("/login", function (req, res) {
  var registered = req.query.registered === "1";
  res.render("login", {
    error: null,
    message: registered ? "Registration successful. Please log in." : null
  });
});

router.post("/login", async function (req, res) {
  var username = (req.body.username || "").trim();
  var password = (req.body.password || "").trim();

  if (!username || !password) {
    return res.status(200).render("login", {
      error: "Please enter both username and password.",
      message: null
    });
  }

  try {
    var collection = await getMainCollection();
    var user = await collection.findOne({
      docType: "user",
      username: username
    });

    if (!user || user.password !== password) {
      return res.status(200).render("login", {
        error: "Invalid username or password.",
        message: null
      });
    }

    req.session.user = { username: user.username };
    res.redirect("/home");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).render("login", {
      error: "An error occurred while logging in. Please try again.",
      message: null
    });
  }
});

module.exports = router;
