import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('product', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.STRING, // Menambahkan kolom category
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Product;

(async()=>{
    await Product.sync();
})();