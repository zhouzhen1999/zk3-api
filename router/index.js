let express = require("express");
let router = express.Router();
let { query } = require("../config/mysqlContent")

router.get("/api/del", function() {
    let sql = `select * from triain`;
    query(sql).then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
})

module.exports = router;