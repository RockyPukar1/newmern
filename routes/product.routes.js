const loginCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/file-upload.middleware");
const { isAdminSeller } = require("../app/middleware/rbac.middleware");
const ProductController = require("../app/controllers/product.controller");
const prod_ctrl = new ProductController()
const router = require("express").Router();

const setDestination = (req, res, next)=> {
    req.dest = "product",
    next();
}

router.route("/")
    .post(
        loginCheck,
        isAdminSeller,
        setDestination,
        uploader.array("images"),
        prod_ctrl.addProduct
    )

module.exports = router;