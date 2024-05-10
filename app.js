import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// added DEL to HTML using method-override
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});