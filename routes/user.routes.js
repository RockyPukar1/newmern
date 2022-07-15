const router = require("express").Router();
const loginCheck = require("../app/middleware/auth.middleware.js");
const {isAdmin} = require("../app/middleware/rbac.middleware");
const UserController = require("../app/controllers/user.controller.js");
let user_obj = new UserController();

router.route("/")
    .get(loginCheck, isAdmin, user_obj.getAllUsers)
    
router.route("/:id")
    .put(user_obj.updateUserById)
    .delete(user_obj.deleteUserById)
    .get(user_obj.getUserById)


module.exports = router;