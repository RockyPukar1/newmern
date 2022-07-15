const CategoryService = require("../services/category.service");
const slugify = require("slugify");
const CategoryModel = require("../models/category.model");
class CategoryController{
    constructor(){
        this.cat_svc = new CategoryService();
    }
    addCategory = (req, res, next) => {
        try{
            let data = req.body;
            if (req.file){
                data.image = req.file.filename;
            }
            this.cat_svc.validateCategory(data);
            if (!data.parent_id) {
                data.parent_id = null;
            }

            // ["", ""] => "", "" => data.brands.split(", ");

            data.slug = slugify(data.title.toLowerCase())
            let category = new CategoryModel(data);
            category.save()
            .then((response)=> {
                res.json({
                    result: category,
                    status: true,
                    msg: "Category Created Succesfully."
                })
            })
            .catch((err)=> {
                next({
                    status: 404,
                    msg: err
                })
            })
        } catch(err){
            next(err)
        }
    }

    getAllCats = async (req, res, next) => {
        try{
            let filter = {};
            if (req.query.show_in_home){
                filter ={
                    show_in_home: true
                }
            }
            let cats = await CategoryModel.find(filter)
                .populate("parent_id")
                .populate("brands")
                res.json({
                    result: cats,
                    status: true,
                    msg: "Category Fetched succesfully"
                })
        } catch (err){
            next({
                status: 500,
                msg: err
            })
        }
    }

    updateCategory = (req, res, next) => {
        try{
            let data = req.body;
            if (req.file){
                data.image = req.file.filename;
            }
            this.cat_svc.validateCategory(data);
            if (!data.parent_id) {
                data.parent_id = null;
            }

            CategoryModel.findByIdAndUpdate(req.params.id, {
                $set: data
            })
            .then((response)=> {
                res.json({
                    result: data,
                    status: true,
                    msg: "Category Updated Succesfully."
                })
            })
            .catch((err)=> {
                next({
                    status: 404,
                    msg: err
                })
            })
        } catch(err){
            next(err)
        }
    }

    deleteCategoryById = async (req, res, next) => {
        try{
            let ack = await CategoryModel.findByIdAndRemove(req.params.id);
            if (ack){
                res.json({
                    result: ack,
                    status: true,
                    msg: "Category added successfully"
                })
            } else {
                res.json({
                    status: false,
                    result: null,
                    msg: "Category doesnot exist or already deleted"
                })
            }
            res.json({
                status: true,
                result: null,
                msg: "Category Deleted Successfully"
            })
        } catch(err){
            next({
                status: 500,
                msg: err
            })
        }
    }

    getCategoryById = async (req, res, next)=> {
        try{
            let category = await CategoryModel.findById(req.params.id)
                            .populate("parent_id")
                            .populate("brands")
            if (category){
                res.json({
                    result: category,
                    status: true,
                    msg: "Category Fetched successfully"
                })
            } else {
                next({
                    status: 400,
                    msg: "Category doesnot exist"
                })
            }
        } catch(err){
            next({
                status: 500,
                msg: err
            })
        }
    }
}
module.exports = CategoryController;