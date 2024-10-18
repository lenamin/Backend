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

app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        res.json({ data: post });
    } catch(e) {
        res.status(500).json({ error: e });
    }
});

// update 
app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(id, { // id로 post 찾은 다음에 update 해라 
            title,
            content,
        });
        res.status(200).json({ data: post });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// delete 
app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndDelete(id);
        res.status(200).json({ data: post });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// comment 추가하기 
app.post("/posts/:id/comments", async (req, res) => {
    const { id } = req.params;
    const { comment, author } = req.body;

    try {
        //해당 게시글을 업데이트 
        const post = await Post.updateOne({
            _id: id
        }, {
            $push: { comments: { comment: comment, author: author } },
        }
    );
        res.status(200).json({ data: post });
    } catch (e) {
        res.status(500).json({error: e});
    }
})

app.delete("/posts/:id/comments/:cid", async (req, res) => {
    const { id, cid } = req.params;

    try {
        const post = await Post.updateOne({
            _id: id,
        }, {
            $pull: { // 객체에서 데이터 뽑아온다 
                comments: { _id: cid }, 
            },
        });
        res.status(200).json({ data: post });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.listen(3000);

