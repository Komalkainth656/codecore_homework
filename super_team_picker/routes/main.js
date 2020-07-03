const express = require("express");
const router = express.Router();
const knex = require("../db/client");
router.get("/", (req, res) => {
    res.redirect("cohorts");
});
module.exports = router;