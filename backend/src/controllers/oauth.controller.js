const crypto = require("crypto")
const axios = require("axios")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

const AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
}

function getFrontendUrl() {
    return (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "")
}

function redirectToLogin(res, message) {
    const params = new URLSearchParams({ oauth_error: message })
    res.redirect(`${getFrontendUrl()}/user/login?${params}`)
}

function setAuthCookie(res, userId) {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET)
    res.cookie("token", token, AUTH_COOKIE_OPTIONS)
}

function getGoogleAuthUrl(state) {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
        state,
    })
    return `${GOOGLE_AUTH_URL}?${params}`
}

async function generateUniqueUsername(email) {
    const base = email.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase() || "user"
    let candidate = base.slice(0, 20)
    let suffix = 0

    while (await userModel.findOne({ username: candidate })) {
        suffix += 1
        candidate = `${base.slice(0, 15)}${suffix}`
    }

    return candidate
}

async function findOrCreateUser(googleUser) {
    const email = googleUser.email?.trim().toLowerCase()
    if (!email) {
        throw new Error("Google account did not return an email")
    }

    let dbUser = await userModel.findOne({ email })

    if (dbUser) {
        return dbUser
    }

    const username = await generateUniqueUsername(email)
    const createPayload = {
        name: googleUser.name || email.split("@")[0],
        username,
        email,
    }

    if (googleUser.picture) {
        createPayload.profile_picture = googleUser.picture
    }

    return userModel.create(createPayload)
}

function redirectGoogle(req, res) {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI) {
        return redirectToLogin(res, "Google OAuth is not configured")
    }

    const state = crypto.randomBytes(32).toString("hex")
    const returnTo = req.query.from === "register" ? "register" : "login"

    res.cookie("oauth_state", state, {
        ...AUTH_COOKIE_OPTIONS,
        maxAge: 10 * 60 * 1000,
    })
    res.cookie("oauth_return_to", returnTo, {
        ...AUTH_COOKIE_OPTIONS,
        maxAge: 10 * 60 * 1000,
    })
    res.redirect(getGoogleAuthUrl(state))
}

async function googleCallback(req, res) {
    try {
        const { code, state, error } = req.query

        if (error) {
            return redirectToLogin(res, "Google sign-in was cancelled")
        }

        if (!code) {
            return redirectToLogin(res, "Missing authorization code")
        }

        if (!state || state !== req.cookies.oauth_state) {
            return redirectToLogin(res, "Invalid OAuth state")
        }

        res.clearCookie("oauth_state", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        const returnPath = req.cookies.oauth_return_to === "register" ? "/user/register" : "/user/login"
        res.clearCookie("oauth_return_to", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })

        const tokenBody = new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        })

        const tokenRes = await axios.post(GOOGLE_TOKEN_URL, tokenBody.toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })

        const { access_token } = tokenRes.data
        if (!access_token) {
            return redirectToLogin(res, "Failed to get access token from Google")
        }

        const userRes = await axios.get(GOOGLE_USERINFO_URL, {
            headers: { Authorization: `Bearer ${access_token}` },
        })

        const dbUser = await findOrCreateUser(userRes.data)
        setAuthCookie(res, dbUser._id)

        res.redirect(`${getFrontendUrl()}${returnPath}?oauth=success`)
    } catch (err) {
        console.error("Google OAuth callback error:", err.response?.data || err.message)
        redirectToLogin(res, "Google sign-in failed. Please try again.")
    }
}

module.exports = {
    redirectGoogle,
    googleCallback,
}
