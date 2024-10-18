const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/facebook");

const db = mongoose.connection;

db.on("error", (err) => {
    console.error(`mongo connect error : ${err}`);
});

db.once("open", () => {
    console.log(`mongo connected successfully`);
});

// 게시판 스키마 
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            comment: String,
            author: String,
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

const Post = mongoose.model("Post", PostSchema);
const app = express()
app.use(express.json());

app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body;

    try {
        // 글 저장 기능 구현
        const post = new Post({
            title: title,
            content: content,
            author: author,
        });
        await post.save();
        res.status(201).json({ data: post });
    } catch (e) {
        res.status(500).json({error: error});
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json({data: posts});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.listen(3000);

