import path from "path";
import fs from "fs"
import Product from "../models/SlideImage.js";

export const getSlideImage = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getSlideImageById = async(req, res) => {
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
}

export const saveSlideImage = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No files Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/slide/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 10000000)
        return res.status(422).json({ msg: "Image must be less than 10 MB" });

    file.mv(`./public/slide/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({
                name: name,
                image: fileName,
                url: url
            });
            res.status(201).json({ msg: "Product created successfully"});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Failed to create product" });
        };
    });
};

export const updateSlideImage = async(req, res) => {
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

        const filepath = `./public/slide/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/slide/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        })
    }

    const name = req.body.title;
    const url = `${req.protocol}://${req.get('host')}/slide/${fileName}`;

    try {
        await Product.update({
            name: name,
            image: fileName,
            url: url
        },{
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({ msg: "Product Update Success"});
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteSlideImage = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    try {
        const filepath = `./public/slide/${product.image}`;
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
