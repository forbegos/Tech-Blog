const router = require("express").Router();
const Entry = require("../models/Entry");
const User = require("../models/User");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Entry.findAll();
    // console.log(blogData);
    const entries = blogData.map((entry) => entry.get({ plain: true }));
    // console.log(entries);
    res.render("homepage", {
      entries,
    });
  } catch (err) {
    res.status(700).json(err);
  }
});

// router.get("/entries/:id", async (req, res) => {
//   try {
//     const entryData = await Entry.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });

//     const entry = entryData.get({ plain: true });

//     res.render("entry", {
//       ...entry,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/entry", async (req, res) => {
  try {
    res.render("entry");
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/login", (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect("/profile");
//     return;
//   }

//   res.render("login");
// });

module.exports = router;
