var express = require("express");
var router = express.Router();

router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.redirect("/login");
  });
});

module.exports = router;
