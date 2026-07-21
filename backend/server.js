const app = require("./src/app");
const connectDB = require("./src/db/db")
const posthog = require("./src/lib/posthog")

connectDB()

app.listen(process.env.PORT || 3000 , () => {
    console.log(`server is running on port ${process.env.PORT}`)
})

process.on("SIGINT", async () => {
    await posthog.shutdown()
    process.exit(0)
})

process.on("SIGTERM", async () => {
    await posthog.shutdown()
    process.exit(0)
})