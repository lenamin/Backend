const http = require("http")
const url = require("url")
const fs = require("fs")

http.createServer((req, res)=> {
    const path = url.parse(req.url, true).pathname; 
    res.setHeader = ("Content-Type", "application/json")
    // URL 통합해서 관리할 맵 객체 넣는다. 

    if (path in urlMap) { // urlMap 안에 path가 있는지 여부에 따라 true or false로 
        urlMap[path](req, res);
    }

}).listen(4500);

const home = (req, res) => {
    res.end("home");
};

const list = (req, res) => {
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    const resStr = JSON.stringify(result);
    console.log(resStr);
    res.end(resStr);
}

const view = (req, res) => {
    const param = url.parse(req.url, true).query;
    console.log(param.id);
    const id = param.id;
    const data = fs.readFileSync("test.json", "utf-8");
    const result = JSON.parse(data);
    const posts = result["result"];

    /*
    posts.forEach(item=> {
        // console.log(item);
        // console.log(item.id, item["id"]);
        console.log(item.title, item["title"]);
    })
        */

    const post = posts.filter(item=> {
        // item에는 각 게시글에 대한 정보가 담겨있음 
        console.log(item, item.id, id);
        return item.id == id;
    });
    console.log(post);
    const postStr = JSON.stringify(post);
    res.end(postStr);
};

const write = (req, res) => {
    // title, contents
    // param에 title과 contents가 들어온다. 
    const param = url.parse(req.url, true).query;
    const title = param.title;
    const content = param.content;

    const data = fs.readFileSync("test.json", "utf-8");
    const result = JSON.parse(data);
    const posts = result["result"];
    
    posts.push({
        id: posts.length + 1,
        title: title, 
        content: content,
    });
    console.log(posts);
    
    // 저장하기 
    // 1) 저장하기 전에 문자열로 바꿔준다 
    const newData = {
        result: posts,
    };
    // 2) 저장
    fs.writeFileSync("test.json", JSON.stringify(newData));
    res.end("");
};

// 게시글 바꾸는 로직 
const edit = (req, res) => {
    const param = url.parse(req.url, true).query;
    const id = param.id;
    const title = param.title;
    const content = param.content; 

    // 기존 데이터 가져오기 
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    const posts = result['result'];
    const newPosts = [];
    posts.forEach(item => {
        if (item.id == id) {
            // 수정로직 들어간다~ 
            item.title = title;
            item.content = content;
            newPosts.push(item);
        } else {
            newPosts.push(item);
        }
    });
    console.log(newPosts);
    const newData = {
        result: newPosts,
    };
    fs.writeFileSync("test.json", JSON.stringify(newData));
    res.end("");

    // 해당 게시글 수정하기 
}

const remove = (req, res) => {
    const param = url.parse(req.url, true).query;
    const id = param.id;
  
    // 기존 데이터 가져오기 
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    const posts = result['result'];
    // 삭제된 글 담는다 
    const newPosts = posts.filter((item) => {
        return item.id != id
    });
    const newData = {
        result: newPosts,
    };
    fs.writeFileSync("test.json", JSON.stringify(newData));
    res.end("");
};

const urlMap = {
    "/write": write,
    "/edit": edit,
    "/remove": remove,
    "/list": list,
    "/view": view,
    "/": home,
};