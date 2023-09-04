const express = require("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000;
require("./config/mongodb")
const createError = require("http-errors")
const fileupload = require("express-fileupload")
app.use(fileupload());
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.all("/", (req, res) => {
    res.send("task-management is strat successfully...")
});

app.use("/api/owner", require("./routes/owner.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/auth", require("./routes/auth.routes")); //this is used only for login

app.use(async (req, res, next) => {
    const err = createError.BadRequest("URL not found")
    next(err);
})

app.use((err, req, res, next) => {
    console.log("error", err)
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

