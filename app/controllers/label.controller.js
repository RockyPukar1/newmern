const LabelService = require("../services/label.service");
const LabelModel = require("../models/label.model");


class LabelController{
    constructor(){
        this.label_svc = new LabelService();
    }

    createLabel = async (req, res, next) => {
        let data = req.body
        if (req.file) {
            data.image = req.file.filename;
        }
        try{
            //validation
            let err_msg = this.label_svc.validateLabelData(data);
            if (err_msg) {
                next({
                    status: 400,
                    msg: err_msg
                })
            } else {
                data.slug = this.label_svc.getLabelSlug(data.title)
                let label = new LabelModel(data);
                let ack = await label.save()
                res.json({
                    status: true,
                    msg: "Label Created Successfully",
                    result: label
                })
            }
        } catch(error) {
            next({
                status: 400,
                msg: error
            })
        }
        
    }

    getAllLabels = async(req, res, next) => {
        try{
            if (req.query.type){
                filter = {
                    type: req.query.type
                }
            }
            let data = await LabelModel.find(filter);
            res.json({
                result: data,
                status: true,
                msg: "Lable created succesfully"
            })
        } catch(err){
            next({
                status: 500,
                msg: err
            })
        }
    }

    getLabelById = async (req, res, next) => {
        try{
            let data = await LabelModel.findById(req.params.id);
            res.json({
                result: data,
                msg: "fetched",
                status: true
            })
        } catch(e){
            next({
                status: 500,
                msg: e,
            })
        }
    }

    updateLabel = async (req, res, next) => {
        let data = req.body
        if (req.file) {
            data.image = req.file.filename;
        }
        try{
            //validation
            let err_msg = this.label_svc.validateLabelData(data, true);
            if (err_msg) {
                next({
                    status: 400,
                    msg: err_msg
                })
            } else {
                let ack = await LabelModel.findByIdAndUpdate(req.params.id, {
                    $set: data
                }, )
                // LabelModel.updatOne({
                //     _id: req.params.id
                // })
                res.json({
                    status: true,
                    msg: "Label Updated Successfully",
                    result: label
                })
            }
        } catch(error) {
            next({
                status: 400,
                msg: error
            })
        }
        
    }

    LabelDeleteById = async (req, res, next) => {
        try{
            let data = await LabelModel.findById(req.params.id);
            if (data) {
                let ack = await LabelModel.findByIdAndDelete(req.params.id)
                res.json({
                    result: data,
                    msg: "Label deleted successfully",
                    status: true
                })
            } else {
                next({
                    status: 400,
                    msg: "Label not found."
                })
            }
        } catch(e){
            next({
                status: 500,
                msg: e,
            })
        }
    }
}

module.exports = LabelController;