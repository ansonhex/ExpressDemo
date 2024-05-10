import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import mongoose from "mongoose";
import articleRouter from "./routes/articles.js"

const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost/blog");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// added DEL to HTML using method-override
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Mount router
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
    const articles = [{
        title: "TEST title",
        createdAt: new Date(),
        description: "TEST DECRI"
    },
    {
        title: "TEST title2",
        createdAt: new Date(),
        description: "TEST DECRI"
    }]
    res.render("index", {articles});
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});