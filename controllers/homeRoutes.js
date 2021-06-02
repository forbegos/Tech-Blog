const router = require("express").Router();
const { Entry, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  // req.session.logged_in = false;
  console.log(req.session.logged_in);
  try {
    const blogData = await Entry.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const entries = blogData.map((entry) => entry.get({ plain: true }));
    console.log(entries);
    res.render("homepage", {
      entries,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/entry", withAuth, async (req, res) => {
  try {
    res.render("entry", {
      include: [{ model: User }],
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
