const express = require("express")
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller")
const creatorController = require("../controllers/creator.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router();

router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)
router.get("/user/logout", authController.logoutUser)
router.get("/user/profile", authMiddleware.authUserMiddleware, userController.getUserProfile)

router.post("/creator/register", authController.registerCreator)
router.post("/creator/login", authController.loginCreator)
router.get("/creator/logout", authController.logoutCreator)
router.get("/creator/profile", authMiddleware.authCreatorMiddleware, creatorController.getCreatorProfile)

module.exports = router;