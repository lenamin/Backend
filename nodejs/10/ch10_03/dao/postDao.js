const models = require("../models"); // index.js 에 있는 db 객체가 models에 할당됨. 

// 게시글 작성하기 
const createPost = async (data) => {
  return await models.Post.create(data);
};

// 특정 게시글 가져오기 
const findPostById = async (id) => {
  return await models.Post.findByPk(id);
};

// 게시글 목록 조회 
const findAllPost = async () => {
  return await models.Post.findAll({ 
    include: {
      model: models.Uwer,
    },
  });
};

 // 게시글 수정하기 
const updatePost = async (id, data) => {
  return await models.Post.update(data, {
    where: { id },
  });
};

const deletePost = async (id) => {
  return await models.Post.destroy({
    where: { id },
  });
}

// 다른 파일에서 require로 불러서 써주기 위해 exports 해줘야 함 
module.exports = {
  createPost,
  findAllPost,
  findPostById,
  updatePost,
  deletePost,
};