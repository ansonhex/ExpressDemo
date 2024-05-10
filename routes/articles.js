import express from "express";

const router = express.Router();

router.get("/new", (req, res) => {
    res.render("articles/new");
});

router.post("/", (req, res) => {
    
});

export default router;