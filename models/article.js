import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
import { marked } from "marked";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const dompurify = createDOMPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

articleSchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        });
    }
    if (this.markdown) {
        const rawHtml = marked(this.markdown);
        this.sanitizedHtml = dompurify.sanitize(rawHtml);
    }
    next();
});

const Article = mongoose.model("Article", articleSchema);
export default Article;