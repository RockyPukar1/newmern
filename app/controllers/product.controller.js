const ProductService = require("../services/product.service");
const slugify = require("slugify");
const ProductModel = require("../models/product.model");
class ProductController{
    constructor(){
        this.prod_svc = new ProductService();
    }
    addProduct = (req, res, next) => {
        // TODO: Add Product
        try{
            let data = req.body;
            if (req.files){
                let images = [];
                req.files.map((image) => {
                    images.push(image)
                })
                data.images = images;
            }

            this.prod_svc.validateProduct(data);

            data.slug = slugify(data.title.toLowerCase());
            data.after_discount = data.price - data.price * data.discount / 100;

            if (!data.category){
                data.category = null;
            }
            if (!data.brands){
                data.brands = null;
            }
            if (!data.seller){
                data.seller = null;
            }

            let product = new ProductModel(data);
            product.save()
            .then((response) => {
                res.json({
                    result: product,
                    status: true,
                    msg: "Product created successfully"
                })
            })
            .catch((error)=> {
                next({
                    status: 400,
                    msg: error
                })
            })

        } catch(error){
            next(error)
        }
    }
}
module.exports = ProductController;