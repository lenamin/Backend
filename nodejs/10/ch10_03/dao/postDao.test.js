const postDao = require('./postDao');

//첫번째 인자: 무엇을 테스트할 것인가?
describe("Test Dao", () => {
  test("should", async () => {
    const data = {
      title: "unit test dao", 
      content: "unit test dao content", 
      userId: 1, 
    };
    const result = await postDao.createPost(data);
    // data.title과 동일한 결과를 가질 것을 기대함 
    expect(result.title).toBe(data.title);
  });

  test("should", async () => {
    const data = {
      title: "unit test dao", 
      content: "unit test dao content", 
      userId: 1, 
    };
    const result = await postDao.findAllPost(data);
    // data.title과 동일한 결과를 가질 것을 기대함 
    expect(result.title).toBe(data.title);
  });

});

