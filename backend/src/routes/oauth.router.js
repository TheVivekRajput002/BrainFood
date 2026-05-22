const express = require("express")
const oauthController = require("../controllers/oauth.controller")

const router = express.Router()

router.get("/google", oauthController.redirectGoogle)
router.get("/google/callback", oauthController.googleCallback)
// Matches GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
router.get("/callback", oauthController.googleCallback)

module.exports = router
