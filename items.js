const express = require("express");
const router = new express.Router();

// const expressError = require("./expressError");
const items = require("./fakeDb");
const ExpressError = require("./expressError");

//GET ALL ITEMS
router.get("/", (req, res, next) => {
  try {
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

//POST NEW ITEM
router.post("/", (req, res, next) => {
  try {
    if (!req.body.name) throw new ExpressError("Name is required", 400);
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (e) {
    return next(e);
  }
});

//GET ITEM BY NAME
router.get("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new expressError("Item not found", 404);
  }
  res.json({ item: foundItem });
});

//EDITING ONE ITEM

router.patch("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  items.push(foundItem.name);
  items.push(foundItem.price);

  res.json({ item: foundItem });
});

//DELETING ONE ITEM

router.delete("/:name", function (req, res) {
  const foundItem = items.findIndex((item) => item.name === req.params.name);
  if (foundItem === -1) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(foundItem, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
