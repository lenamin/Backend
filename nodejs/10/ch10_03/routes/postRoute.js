const express = require("express");
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/auth_middleware");

const router = express.Router();

// posts는 이미 있다고 생각, 이 다음에 posts/ 이후의 URL 설정한다고 생각하면 된다 
router.post('/', postController.createPost);  // POST /posts
router.get('/', postController.findAllPost);  // GET /posts
router.get('/:id', postController.findPostById); // GET /post2/1
router.put('/:id', postController.updatePost); // PUT /post2/1 
router.delete('/:id', postController.deletePost); // DELETE /posts/1 

module.exports = router; // app.js에서 그대로 사용할 부분 