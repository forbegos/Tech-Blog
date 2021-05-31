const router = require("express").Router();
const Entry = require("../../models/Entry");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newEntry = await Entry.create({
      ...req.body,
      username: req.session.username,
    });

    res.status(200).json(newEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const delEntry = await Entry.destroy({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    });

    if (!delEntry) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(delEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
