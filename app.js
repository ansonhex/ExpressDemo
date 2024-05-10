import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import mongoose from "mongoose";
import articleRouter from "./routes/articles.js"
import articleModel from "./models/article.js"

const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost/blog");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// added DEL to HTML using method-override
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const articles = await articleModel.find().sort({createdAt: "descending"});
    res.render("articles/index", {articles});
});

// Mount router
app.use("/articles", articleRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});