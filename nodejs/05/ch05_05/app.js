const express = require('express');
const fs = require('fs');
const moment = require('moment');
const sqlite3 = require('sqlite3'); // 메모리에다가도, 실제 파일로도 데이터 생성할 수 있음 
const path = require('path');

// DB setting 
const db_name = path.join(__dirname, "post.db"); // 실제 db 파일이 있는 경로 
const db = new sqlite3.Database(db_name); // db라는 변수에 sqlite 객체가 담겨있다 

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement, 
        title varchar(255),
        content text,
        author varchar(100),
        createdAt varchar(100),
        count integer default 0
    )
`;

db.serialize(()=>{
    db.run(create_sql);
})


app.get("/list", (req, res) => {
    // paging 
    let page = req.query.page ? parseInt(req.query.page) : 1;
    // 한 페이지에 뿌려줄 개수 
    const limit = 15;
    const offset = (page - 1) * limit;
    
    let sql = `select id, title, content, author, createdAt, count from posts order by 1 desc limit ? offset ? `; // ID 큰게 역순으로 
    db.all(sql, [limit, offset], (err,  rows) => { 
        if(err) {
            res.status(500).send("Internal Server Error");
        } else {
            db.get(`select count(1) as count from posts`, (err, row) => {
                if (err) {
                    res.status(500).send("Internal Server Error");
                } else {
                    const total = row.count;
                    const totalPage = Math.ceil(total / limit);
                    res.render("list", { posts: rows, currentPage: page, totalPage: totalPage });
                }
            })
        }
    })
});


// // 라우터 
// app.get("/list", (req, res) => {
//     const data = fs.readFileSync('test.json', 'utf-8');
//     const result = JSON.parse(data)
//     res.render("list", {posts: result["result"]});
// });


app.get("/view/:id", (req, res) => {
    const id = req.params.id;

    let sql = `select id, title, content, author, createdAt, count from posts where id = ${id}`;

    let countSql = `update posts set count = count + 1 where id = ${id}`;
    db.run(countSql);

    db.all(sql, [], (err, rows) => {
        if(err) {
            res.status(500).send("Internal Server Error");
        } else {
            const post = rows[0];
            res.render("view", { post: post });   
        }
    })
} )



app.use(express.urlencoded( { extended: true }));


app.post("/create", (req, res) => {
    const createdAt = moment().format("YYYY-MM-DD");
    let sql = `insert into posts(title, content, author, createdAt) values ('${req.body.title}', '${req.body.content}', '${req.body.author}', '${createdAt}')`
    
    db.run(sql, (err)=> {
        if(err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.redirect("/list");
        }
    });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;

    let sql = `select id, title, content, author, createdAt, count from posts where id = ${id}`;

    db.all(sql, [], (err, rows) => {
        if(err) {
            res.status(500).send("Internal Server Error");
        } else {
            const post = rows[0];
            res.render("edit", { post: post });   
        }
    })
});

// app.get("/view/:id", (req, res) => {
//     const id = req.params.id; // router 뒤에 있는 ID를 id에 담는다. 

//     const data = fs.readFileSync('test.json', 'utf-8');
//     // 게시글 count 
//     let result = JSON.parse(data)
//     let post = {}

//     result['result'].forEach((item)=> {
//         if (item['id'] == id) {
//             post = item;
//             item.count = item.count + 1;
//         }
//     })

//     fs.writeFileSync('test.json', JSON.stringify(result), 'utf-8');

    
//     // const result = JSON.parse(data);
//     // let post = {};
//     // const posts = result["result"];
//     // posts.forEach(item=> { // posts 를 쭉 돌면서 id가 같은것만 item에 넣어준다. 
//     //     if (item['id'] == id) {
//     //         post = item;
//     //     }
//     // });
//     res.render("view", { post: post });
// })

// // Save 
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;

    let sql = `update posts set 
    title = '${req.body.title}', 
    content = '${req.body.content}', 
    author = '${req.body.author}' 
    where id = ${id}`;

    db.run(sql, (err) => {
        if (err) {
            res.status(500).send("Internal Server Error")
        } else {
            res.redirect(`/view/${id}`);
        }
    })
});

// Delete 
app.get("/remove/:id", (req, res) => {
    const id = req.params.id;

    let sql = `delete from posts where id = ${id}`;
    db.run(sql, (err) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.redirect("/list");
        }
    });
});

app.listen(PORT, (req, res) => {
    console.log(`게시판 서버를 시작합니다.`);
});

