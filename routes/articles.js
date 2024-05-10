import express from "express";
import Article from "../models/article.js";

const router = express.Router();

router.get("/new", (req, res) => {
    res.render("articles/new", {article: new Article()});
});

// dynamically parsing /:id
router.get("/:slug", async (req, res) => {
    let article = await Article.findOne({slug: req.params.slug});
    if (article == null) {
        res.redirect("/");
    }
    res.render("articles/show", {article});
});

router.post("/", async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    // save to db
    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        res.render("articles/new", {article});
    }
});

router.delete("/:id", async (req, res) => {
    await Article.findOneAndDelete(req.params.id);
    res.redirect("/");
});

export default router;