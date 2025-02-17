const { material } = require("./../../models/index");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const sequelize = require("../../config/dbConfig");

// Create Material
exports.createMaterial = async (req, res) => {
  try {
    const {
      name_ar,
      name_en,
      barcode,
      currency_ar,
      currency_en,
      price_1,
      price_2,
      price_3,
      price_4,
      tax_percentage,
      tax_value,
      unit,
    } = req.body;

    const image_url = `http://localhost:8001/uploads/${req.file.filename}`;
    const user_id = 1;
    const newMaterial = await material.create({
      user_id,
      name_ar,
      name_en,
      barcode,
      currency_ar,
      currency_en,
      price_1,
      price_2,
      price_3,
      price_4,
      tax_percentage,
      tax_value,
      unit,
      image_url,
    });

    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await material.findAll();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const materials = await material.findByPk(req.params.id);
    if (!materials)
      return res.status(404).json({ error: "Material not found" });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Material
exports.updateMaterial = async (req, res) => {
  try {
    const materialToUpdate = await material.findByPk(req.params.id);
    if (!materialToUpdate) {
      return res.status(404).json({ error: "Material not found" });
    }

    const {
      user_id,
      name_ar,
      name_en,
      barcode,
      currency_ar,
      currency_en,
      price_1,
      price_2,
      price_3,
      price_4,
      tax_percentage,
      tax_value,
      unit,
    } = req.body;

    await material.update(
      {
        user_id,
        name_ar,
        name_en,
        barcode,
        currency_ar,
        currency_en,
        price_1,
        price_2,
        price_3,
        price_4,
        tax_percentage,
        tax_value,
        unit,
      },
      {
        where: { id: req.params.id },
      }
    );

    const updatedMaterial = await material.findByPk(req.params.id);
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Material
exports.deleteMaterial = async (req, res) => {
  try {
    const materials = await material.findByPk(req.params.id);

    if (!materials)
      return res.status(404).json({ error: "Material not found" });

    if (materials.image_url) {
      const imagePath = path.join(__dirname, "..", materials.image_url);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await material.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
