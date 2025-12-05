var express = require("express");
var router = express.Router();

var { requireAuth } = require("../middleware/authMiddleware");
var { getMainCollection } = require("../database/connect");
var {
  destinations,
  findDestinationsByCategory,
  findDestinationById,
  searchDestinationsByName
} = require("./destinationData");

// Home after login
router.get("/home", requireAuth, function (req, res) {
  var username = req.session.user.username;
  res.render("home", { username: username });
});

// Category page
router.get("/categories/:categoryName", requireAuth, function (req, res) {
  var categoryName = req.params.categoryName;
  var list = findDestinationsByCategory(categoryName);

  res.render("category", {
    username: req.session.user.username,
    category: categoryName,
    destinations: list
  });
});

// Destination page
router.get("/destinations/:id", requireAuth, async function (req, res) {
  var destinationId = req.params.id;
  var dest = findDestinationById(destinationId);

  if (!dest) {
    return res.status(404).render("error", {
      message: "Destination not found",
      error: {}
    });
  }

  var username = req.session.user.username;
  var alreadyInList = false;

  try {
    var collection = await getMainCollection();
    var userDoc = await collection.findOne({
      docType: "user",
      username: username
    });

    var wantList = (userDoc && userDoc.wantToGoList) || [];
    alreadyInList = wantList.indexOf(destinationId) !== -1;
  } catch (err) {
    console.error("Error checking wantlist:", err);
  }

  res.render("destination", {
    username: username,
    destination: dest,
    alreadyInList: alreadyInList,
    errorMessage: null
  });
});

// Add to Want-to-Go list
router.post("/wantlist/add", requireAuth, async function (req, res) {
  var destinationId = req.body.destinationId;
  var username = req.session.user.username;

  var dest = findDestinationById(destinationId);
  if (!dest) {
    return res.status(404).render("error", {
      message: "Destination not found",
      error: {}
    });
  }

  try {
    var collection = await getMainCollection();
    var userDoc = await collection.findOne({
      docType: "user",
      username: username
    });

    var wantList = (userDoc && userDoc.wantToGoList) || [];
    if (wantList.indexOf(destinationId) !== -1) {
      return res.render("destination", {
        username: username,
        destination: dest,
        alreadyInList: true,
        errorMessage: "Destination already in your Want-to-Go list."
      });
    }

    await collection.updateOne(
      { docType: "user", username: username },
      { $addToSet: { wantToGoList: destinationId } }
    );

    res.redirect("/wantlist");
  } catch (err) {
    console.error("Error adding to wantlist:", err);
    res.status(500).render("error", {
      message: "Error adding destination to your Want-to-Go list.",
      error: err
    });
  }
});

// View Want-to-Go list
router.get("/wantlist", requireAuth, async function (req, res) {
  var username = req.session.user.username;
  var userDestinations = [];

  try {
    var collection = await getMainCollection();
    var userDoc = await collection.findOne({
      docType: "user",
      username: username
    });

    var ids = (userDoc && userDoc.wantToGoList) || [];
    userDestinations = ids
      .map(function (id) {
        return findDestinationById(id);
      })
      .filter(function (d) {
        return d;
      });
  } catch (err) {
    console.error("Error loading wantlist:", err);
  }

  res.render("wantlist", {
    username: username,
    destinations: userDestinations
  });
});

// Remove from Want-to-Go list
router.post("/wantlist/remove", requireAuth, async function (req, res) {
  var username = req.session.user.username;
  var destinationId = req.body.destinationId;

  try {
    var collection = await getMainCollection();
    await collection.updateOne(
      { docType: "user", username: username },
      { $pull: { wantToGoList: destinationId } }
    );
  } catch (err) {
    console.error("Error removing from wantlist:", err);
  }

  res.redirect("/wantlist");
});

// Search
router.get("/search", requireAuth, function (req, res) {
  var query = (req.query.q || "").trim();
  var results = [];

  if (query.length > 0) {
    results = searchDestinationsByName(query);
  }

  res.render("search", {
    username: req.session.user.username,
    query: query,
    results: results
  });
});

module.exports = router;
