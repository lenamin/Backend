// service 를 require 한다. 
// 가능한한 dao 를 직접적으로 require하지 않는다. 
// 역할을 분리하기 위해 controllers에서는 꼭 services만 require 해야 한다. 
const postService = require('../services/postService');
 
const createPost = async (req, res) => {
  // db 가져올 때 예외 발생할 수 있으므로 try-catch 문 작성 
  try { 
    // { "title":"a", "content":"b", "userId":2} = req.body
    const post = await postService.createPost(req.body);
    res.status(201).json({ data: post });
  } catch (e) {
    res.status(500).json({error: e.message }); 
    // 실제로는 보안상 에러메시지 직접 보여주지는 않는다. ! 
  }
};

const findPostById = async (req, res) => {
  try {

    const post = await postService.findPostById(req.params.id);
    if (post) {
      res.status(200).json({data:post});
    } else {
      res.status(404).json({ error: "Post not found"});
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};

const findAllPost = async (req, res) => {
  try {
    const posts = await postService.findAllPost();
    res.status(200).json({data: posts});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

};

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (post) {
      res.status(200).json({ data: "Success" });
    } else {
      res.status(404).json({ data: 'post not found' });
    }
  } catch {

  }
};

const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePost(req.params.id);
    if(result) {
      res.status(200).json({message: "success"});
    } else {
      res.status(404).json({ message: "not found post"});
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createPost,
  findPostById, 
  findAllPost,
  updatePost,
  deletePost,
};