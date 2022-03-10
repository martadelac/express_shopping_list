const express = require("express");
const router = new express.Router();

const ITEMS = [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.4 },
];

router.get("/", (req, res) => {
  res.json({ items: ITEMS });
});

router.get("/:name", (req, res) => {
  const item = ITEMS.find((i) => i.name === +require.params.name);
  res.json({ item });
});

module.exports = router;
