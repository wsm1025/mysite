const express = require("express");
const app = express();

const { user, system } = require("./index");

// 解决跨域
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == "OPTIONS") {
        res.send(200); /*让options请求快速返回*/
    } else {
        next();
    }
});

[...Object.values(user), ...Object.values(system)].forEach((item) => {
    app[item.method]("/api" + item.url, (req, res) => {
        res.status(200).send(item.response());
    });
});

app.listen(3001, () => {
    console.log("server is running at http://localhost:3001");
});
