let { mysqlOption } = require("./config.js")
let mysql = require("mysql")

var connection = mysql.createPool(mysqlOption);

function query(sql) {
    return new Promise((resolve, reject) => {
        //2、从连接池中获取一条连接
        connection.getConnection((err, connect) => {

            connect.query(sql, (sqlerr, rows, fields) => {
                if (sqlerr) {
                    reject(sqlerr)
                    return
                }
                resolve(rows)
                    //释放连接
                connect.release()
            })
        });
    })
}

const readHandle = (sql) => {
    return new Promise((resolve, reject) => {
        query(sql).then(data => {
            if (data.length > 0 && data[0].time != undefined) {
                data = data.map(i => {
                    i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss');
                    return i;
                })
            }
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

//检测是否有值(有返回false) 比如:注册没被使用就返回false,存在就返回true
const searchHandle = (sql) => {
    return new Promise((resolve, reject) => {
        query(sql).then(data => {
            if (data.length > 0) {
                reject("有值")
            } else {
                resolve("无值")
            }
        }).catch(err => {
            reject(err)
        })
    })
}


const searchHandleNormal = (sql) => {
    return new Promise((resolve, reject) => {
        query(sql).then(data => {
            if (data.length > 0) {
                resolve("有值")
            } else {
                reject("无值")
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//sql语句操作  
const sqlHandle = (sql) => {
    return new Promise((resolve, reject) => {
        query(sql).then(data => {
            if (data.affectedRows > 0) {
                resolve("ok")
            } else {
                reject("err")
            }
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    query,
    sqlHandle,
    readHandle,
    searchHandle,
    searchHandleNormal
}