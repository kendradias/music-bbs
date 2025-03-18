const express = require("express");
const router = express.Router();
const { searchMusic } = require("../services/musicApiService");

router.get("/search", async (req, res) => {
  console.log("[DEBUG] GET /search called");
  console.log("[DEBUG] Received query:", req.query.query, "attribute:", req.query.attribute);

  if (!req.query.query || !req.query.attribute) {
    console.error("[ERROR] Missing query or attribute parameter");
    return res.status(400).json({ error: "Missing query or attribute parameter" });
  }

  try {
    const data = await searchMusic(req.query.query, req.query.attribute);
    console.log("[DEBUG] searchMusic result:", data);
    return res.json(data);
  } catch (error) {
    console.error("[ERROR] Failed to fetch music data:", error);
    return res.status(500).json({ error: "Failed to fetch music data" });
  }
});

module.exports = router;
