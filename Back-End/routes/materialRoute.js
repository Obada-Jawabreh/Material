const express = require("express");
const router = express.Router();
const auth = require("./../middleware/authMiddleware");
const upload = require("./../config/multer-config");
const materialController = require("./../controllers/materialController/manageMaterial");
router.post(
  "/create",
  upload.single("image"),
  materialController.createMaterial
);
router.get("/get", materialController.getMaterials);
router.get("/get/:id", materialController.getMaterialById);
router.put(
  "/update/:id",
  // upload.single("image"),
  materialController.updateMaterial
);
router.delete("/delete/:id", materialController.deleteMaterial);

module.exports = router;
