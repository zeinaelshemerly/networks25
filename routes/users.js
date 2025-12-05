var express = require("express");
var router = express.Router();

/* Just a sample route, not used for grading. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

module.exports = router;
