var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  if (req.session && req.session.user) {
    return res.redirect("/home");
  }
  res.redirect("/login");
});

module.exports = router;
