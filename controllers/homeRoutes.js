const router = require("express").Router();
const Entry = require("../models/Entry");
const User = require("../models/User");

router.get("/", async (req, res) => {
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

router.get("/entry", async (req, res) => {
  try {
    res.render("entry");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
