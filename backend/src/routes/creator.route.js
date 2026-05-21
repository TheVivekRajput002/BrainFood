const express = require("express")
const multer = require("multer")
const authMiddleware = require("../middleware/auth.middleware")
const creatorController = require("../controllers/creator.controller")

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router()

router.post("/:id/follow",authMiddleware.authUserMiddleware,  creatorController.followCreator  )

router.get("/profile",authMiddleware.authCreatorMiddleware, creatorController.getCreatorProfile  )
router.post('/profile-picture', authMiddleware.authCreatorMiddleware, upload.single("image"), creatorController.updateCreatorProfile)
module.exports = router;