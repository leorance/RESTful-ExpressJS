var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const { Product } = require("../models");

// POST
router.post("/", async (req, res) => {
  // valid
  const schema = {
    name: "string",
    brand: "string",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }

  // proses create
  const products = await Product.create(req.body);
  res.json({
    status: 200,
    message: "Sukses tambah data",
    data: products,
  });
});

// PUT
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let products = await Product.findByPk(id);
  if (!products) {
    return res.status(404).json({ status: 404, message: "data not found!" });
  }
  // valid
  const schema = {
    name: "string|optional",
    brand: "string|optional",
    description: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }

  // proses update
  products = await products.update(req.body);
  res.json({
    status: 200,
    message: "Sukses update data",
    data: products,
  });
});

// GET
router.get("/", async (req, res) => {
  const products = await Product.findAll();
  return res.json({
    status: 200,
    message: "Berhasil mengambil semua data",
    data: products,
  });
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let products = await Product.findByPk(id);
  if (!products) {
    return res
      .status(404)
      .json({ status: 404, message: "Data tidak ditemukan" });
  } else {
    return res.json({
      status: 200,
      message: "Data berhasil ditemukan",
      data: products,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let products = await Product.findByPk(id);
  if (!products) {
    return res
      .status(404)
      .json({ status: 404, message: "Data tidak ditemukan" });
  }

  // proses delete data
  await products.destroy();
  res.json({
    status: 200,
    message: "data berhasil di hapus!",
  });
});
module.exports = router;
