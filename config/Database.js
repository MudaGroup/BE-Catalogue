import { Sequelize } from "sequelize";

const db = new Sequelize('catalog_jgm', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    logging: console.log
});

export default db;