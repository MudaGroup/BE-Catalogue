import Product from "../models/CatalogModels.js";
import path from "path";
import fs from "fs";

export const getCatalog = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getCatalogById = async(req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
};

export const saveCatalog = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No Files Uploaded" });
    const name = req.body.title;
    const desc = req.body.desc;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/catalog/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 10000000)
        return res.status(422).json({ msg: "Image must be less than 10 MB" });

    file.mv(`./public/catalog/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({
                name: name,
                desc: desc,
                image: fileName,
                url: url,
            });
            res.status(201).json({ msg: "Product Created Successfully" });
        } catch (error) {
            console.log(error.message);
        }
    });
};

export const updateCatalog = async(req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    if (req.files === null) {
        fileName = product.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid Image" });
        if (fileSize > 10000000)
            return res.status(422).json({ msg: "Image must be less than 10 MB" });

        const filepath = `./public/catalog/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/catalog/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const name = req.body.title;
    const desc = req.body.desc;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Product.update({
            name: name,
            desc: desc,
            image: fileName,
            url: url
        }, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCatalog = async(req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    try {
        const filepath = `./public/catalog/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};