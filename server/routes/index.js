const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const jobRoutes = require("./job.routes");
const chatRoutes = require("./chat.routes");
const geocodeRoutes = require("./geocode.routes");
const productRoute = require("./product.routes");
router.get("/health-check", (req, res) => {
  res.send("OK");
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/jobs", jobRoutes);
router.use("/products", productRoute);

router.use("/chats", chatRoutes);
router.use("/geocode", geocodeRoutes);

module.exports = router;
