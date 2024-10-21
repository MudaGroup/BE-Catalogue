import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('catalog_product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: DataTypes.TEXT,
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
});


export default Product;

(async()=>{
    await Product.sync();
})();