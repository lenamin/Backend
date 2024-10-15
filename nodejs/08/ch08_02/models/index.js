'use strict'; // js 문법 엄격히 검사함 

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // 노드에 설정된 환경인 .ENV 파일에 이 값이 없으면 'development'에 있는 파일을 적용 
const config = require(__dirname + '/../config/config.json')[env]; // config.json의 developement 에 지금 config 정보가 담긴 것 
const db = {};

let sequelize;
if (config.use_env_variable) {
  // config에 있는 정보 담김 
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Model 디렉토리에 설정된 모든 파일을 불러와서 db 객체에 넣어준다. 
// 이 파일에 모델 파일을 기술해놓으면, 담아줌 
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  // 관계 정의해놓으면 
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 최종적으로는 db 객체에 해당되는 모델들의 정보가 모두 담김 
module.exports = db;
