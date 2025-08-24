const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./router/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

// Middleware to parse JSON request body
app.use(express.json());

// Routes
app.use("/url", urlRoute);

// Redirect Route
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        { 
            $push: { visitHistory: { timestamp: Date.now() } }
        }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
});

// DB Connection
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
