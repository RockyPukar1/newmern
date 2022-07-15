const express = require("express");
const app = express();

require("./config/mongo.config");

const routes = require("./routes/route.js");

const myEvent = require("./app/events/events.js")
 
// req =======> Middleware =======> action
/**
 * req, res, next=> gives the middleware call after it
 * middleware always contains at least (req, res, next) compulsorily
 * --------------------------------
 *   Types of Middle ware
 * a. Application level Middleware
 * b. Routing level Middleware
 * c. Builtin/ Static Middleware
 * d. Custom Middleware
 * e.Third Party Middleware
 * f. Error handling Middleware
 */
 
// let router =  express.Router();
// router.get("/", (req, res, next) => {
 
// });
// app.use(router);  //even we use router but we need ot mount it to app
 
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
//multipart/form-data
 
app.use("/assests", express.static(process.cwd()+ "/uploads"))
 
 
// http://localhost:9001/api/v1/
app.use("/api/v1", routes);
 
app.use((req, res, next) => {
    next({
        result: " how are you",
        status: 404,
        msg: "Not Found"
    })
});
 
// error handling (alway executable piece of code) abd should be always written after mounting.
app.use((error, req, res, next) => {
    let status =  error.status || 500;
    let msg = error.msg;
    let result = error.result
    console.log(error);
    res.json({
        result: result,
        msg: msg,
        status: status
    });
});
 
app.listen(9001, "127.0.0.1", (err) => {
    if (err) {
        console.error("APP: ", err);
        console.log("Error listening to port 9001: ");
    } else {
        console.log("Server is listening to port 9001");
        console.log("Press CTRL+C to end the server");
    }
});