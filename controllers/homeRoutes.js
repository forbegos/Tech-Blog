const router = require("express").Router();
const Entry = require("../models/Entry");
const User = require("../models/User");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  req.session.logged_in = false;
  try {
    const blogData = await Entry.findAll();
    const entries = blogData.map((entry) => entry.get({ plain: true }));
    res.render("homepage", {
      entries,
    });
  } catch (err) {
    res.status(700).json(err);
  }
});

router.get("/entry", withAuth, async (req, res) => {
  try {
    res.render("entry", {
      include: [{ model: User, attributes: ["username"] }],
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
