import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('slide_image', {
    name: {
        type: DataTypes.STRING,
        allowNull: true // Kolom ini dapat bernilai null
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true // Kolom ini dapat bernilai null
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true // Kolom ini dapat bernilai null
    }
}, {
    freezeTableName: true
});

export default Product;

(async()=>{
    await Product.sync();
})();