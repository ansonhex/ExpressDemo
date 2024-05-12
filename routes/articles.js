import express from "express";
import Article from "../models/article.js";
import slugify from "slugify";

const router = express.Router();

router.get("/new", (req, res) => {
    res.render("articles/new", {article: new Article()});
});

router.get("/edit/:slug", async (req, res) => {
    try {
        let article = await Article.findOne({slug: req.params.slug});
        if (!article) {
            return res.sendStatus(404);
        }
        res.render("articles/edit", {article});
    } catch(error) {
        res.sendStatus(500);
    }
});

// dynamically parsing /:slug
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

router.put("/:slug", async (req, res, next) => {
    req.article = await Article.findOne({slug: req.params.slug});
    next();
}, saveArticleAndRedirect("edit"));

router.delete("/:slug", async (req, res) => {
    try {
        const result = await Article.findOneAndDelete({slug: req.params.slug});
        if (!result) {
            return res.sendStatus(404);
        }
        res.redirect("/");
    } catch (error) {
        res.sendStatus(500);
    }
});

// Comment route
router.post("/:slug/comments", async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (!article) {
            return res.sendStatus(404);
        }
        // Main logic
        article.comments.push({
            body: req.body.body,
        });
        await article.save();
        res.redirect(`/articles/${req.params.slug}`);
    } catch (error) {
        res.sendStatus(500);
    }
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        // Update slug if title changes
        article.slug = slugify(article.title, {lower: true, strict: true});
        try {
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
    } catch (e) {
            res.render(`article/${path}`, {article});
        }
    }
}

export default router;
