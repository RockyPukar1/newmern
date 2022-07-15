const AuthService = require("../services/auth.service");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

class AuthController {
    constructor() {
        this.auth_svc = new AuthService();
    }

    login = async (req, res, next) => {
        try {
            let data = req.body;
            let result = this.auth_svc.loginValidate(data);
            let user = await UserModel.findOne({
                email: data.email
            })

            if (user) {
                if (bcrypt.compareSync(data.password, user.password)){
                    let access_token = this.auth_svc.generateAccessToken({
                        id: user._id,
                        name: user.name,
                        role: user.role[0]
                    })

                    res.json({
                        result: {
                            user: user,
                            access_token: access_token
                        },
                        status: true,
                        msg: "Login Successful"
                    })
                } else {
                    throw "Credentials does not match"
                }
            } else{
                throw "User doesnot exist";
            }
        } catch (error) {
            console.log("LoginException: ", error);
            next({
                result: null,
                status: 400,
                msg: error
            })
        }
    }

    register = (req, res, next) => {
        let data = req.body;
        if (req.file) {
            data.image = req.file.filename;
        }
        try {

            let validation = this.auth_svc.registerValidate(data)

            if (validation) {
                next({
                    status: 400,
                    msg: validation
                })
            } else {

                let hash = bcrypt.hashSync(data.password, 10);  // encryption
                data.password = hash;
                
                let user = new UserModel(data);
                // UserModel.insertMany() // mongoose has all the function of core mongodb function
                user.save() // mongoose function save => it stores the data in User Model for now.
                            // insert, insertOne, insertMany
                .then((ack) => {
                    res.json({
                        result: user,
                        status: true,
                        msg: "User Registered Successfully"
                    })
                })
                .catch((err) => {
                    next({
                        status: 500,
                        msg: err
                    })
                })
            }
        } catch (error) {
            next({
                status: 400,
                msg: error
            })
        }
    }

}

module.exports = AuthController;