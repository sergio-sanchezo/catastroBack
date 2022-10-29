import fs from "fs";
import path from "path";
import { Sequelize, DataType } from "sequelize-typescript";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const config = require(__dirname + "/../config/config.json")[env];
const db: any = {};

let sequelize = new Sequelize(config.database, config.engine, config.password, {
  host: config.host,
  dialect: config.dialect,
  sync: { force: true },
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file: string) => {
    let modelName = file.split(".");

    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      modelName[modelName.length - 2] === "model"
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataType
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
