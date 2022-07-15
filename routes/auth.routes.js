const router =  require("express").Router();
const AuthController = require("../app/controllers/auth.controller")
const auth_ctrl = new AuthController;
const uploader = require("../app/middleware/file-upload.middleware");
let setDestination = (req, res, next) => {
    req.dest = "users",
    next()
}

http://localhost:9001/api/v1/register
router.post(
    "/register", 
    setDestination, 
    uploader.single('image'), 
    auth_ctrl.register
);

http://localhost:9001/api/v1/login
router.post(
    "/login", 
    auth_ctrl.login
);

module.exports = router;
