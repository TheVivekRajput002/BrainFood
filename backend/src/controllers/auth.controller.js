const userModel = require("../models/user.model")
const creatorModel = require("../models/creator.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const posthog = require("../lib/posthog")

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
};
const CLEAR_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
};

async function registerUser(req, res) {
    try {
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const normalizedUsername = username.trim().toLowerCase();
        const normalizedEmail = email.trim().toLowerCase();

        const isEmailTaken = await userModel.findOne({ email: normalizedEmail })
        if (isEmailTaken) {
            return res.status(400).json({
                message: "email already in use"
            })
        }

        const isUsernameTaken = await userModel.findOne({ username: normalizedUsername })
        if (isUsernameTaken) {
            return res.status(400).json({
                message: "username already in use"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            username: normalizedUsername,
            email: normalizedEmail,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, COOKIE_OPTIONS);

        posthog.identify({
            distinctId: String(user._id),
            properties: {
                $set: { name: user.name, email: user.email, username: user.username },
                $set_once: { created_at: new Date().toISOString() },
            },
        })
        posthog.capture({
            distinctId: String(user._id),
            event: "user registered",
            properties: { registration_method: "email", username: user.username },
        })

        res.status(201).json({
            message: "user registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                username: user.username
            }
        })
    } catch (err) {
        console.error("Registration error:", err);
        posthog.captureException(err, undefined, { endpoint: "/api/auth/register" })
        res.status(500).json({
            message: "Registration failed",
            error: err.message
        })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email.trim().toLowerCase() })

        if (!user) {
            return res.status(400).json({
                message: "invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "invalid email or password"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, COOKIE_OPTIONS);

        posthog.identify({
            distinctId: String(user._id),
            properties: {
                $set: { name: user.name, email: user.email, username: user.username },
            },
        })
        posthog.capture({
            distinctId: String(user._id),
            event: "user logged in",
            properties: { login_method: "email" },
        })

        res.status(200).json({
            message: "logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
            }
        })
    } catch (err) {
        console.error("Login error:", err);
        posthog.captureException(err, undefined, { endpoint: "/api/auth/login" })
        res.status(500).json({
            message: "Login failed",
            error: err.message
        })
    }
}

function logoutUser(req, res) {
    try {
        const token = req.cookies?.token
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded?.id) {
                posthog.capture({ distinctId: String(decoded.id), event: "user logged out" })
            }
        }
    } catch {
        // token invalid or expired — skip tracking
    }
    res.clearCookie("token", CLEAR_COOKIE_OPTIONS);
    res.status(200).json({
        message: "logged out successfully"
    })
}

async function registerCreator(req, res) {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const isCreatorAlreadyExists = await creatorModel.findOne({
            email
        });

        if (isCreatorAlreadyExists) {
            return res.status(400).json({
                message: "food partner already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const creator = await creatorModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: creator._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, COOKIE_OPTIONS);

        posthog.identify({
            distinctId: String(creator._id),
            properties: {
                $set: { name: creator.name, email: creator.email, account_type: "creator" },
                $set_once: { created_at: new Date().toISOString() },
            },
        })
        posthog.capture({
            distinctId: String(creator._id),
            event: "creator registered",
            properties: { registration_method: "email" },
        })

        res.status(201).json({
            message: "creator registered successfully",
            creator: {
                _id: creator._id,
                email: creator.email,
                name: creator.name
            }
        })
    } catch (err) {
        console.error("Creator registration error:", err);
        posthog.captureException(err, undefined, { endpoint: "/api/auth/creator/register" })
        res.status(500).json({
            message: "Creator registration failed",
            error: err.message
        })
    }
}

async function loginCreator(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const creator = await creatorModel.findOne({
            email
        })

        if (!creator) {
            return res.status(400).json({
                message: "invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, creator.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "invalid email or password"
            })
        }

        const token = jwt.sign({
            id: creator._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, COOKIE_OPTIONS);

        posthog.identify({
            distinctId: String(creator._id),
            properties: {
                $set: { name: creator.name, email: creator.email, account_type: "creator" },
            },
        })
        posthog.capture({
            distinctId: String(creator._id),
            event: "creator logged in",
            properties: { login_method: "email" },
        })

        res.status(201).json({
            message: "logged in succesfuly",
            creator: {
                _id: creator._id,
                email: creator.email,
                name: creator.name
            }
        })
    } catch (err) {
        console.error("Creator login error:", err);
        posthog.captureException(err, undefined, { endpoint: "/api/auth/creator/login" })
        res.status(500).json({
            message: "Creator login failed",
            error: err.message
        })
    }
}

function logoutCreator(req, res) {
    try {
        const token = req.cookies?.token
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded?.id) {
                posthog.capture({ distinctId: String(decoded.id), event: "creator logged out" })
            }
        }
    } catch {
        // token invalid or expired — skip tracking
    }
    res.clearCookie("token", CLEAR_COOKIE_OPTIONS);
    res.status(200).json({
        message: "food partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerCreator,
    loginCreator,
    logoutCreator
}
