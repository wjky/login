const express = require('express')
const router = express.Router()

const db = require('../db/config.js');
var bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.json())

let responseData = {
    code: 0,
    message: '',
    logname:'',
}

router.post('/register', (req, res) => {
    let { regUserName, regPassword, checkPassword } = req.body;

    if (regUserName.trim() == '') {
        responseData.code = 1;
        responseData.message = "注册用户名不能为空";
        res.json(responseData);
        return;
    }
    if (regPassword.trim() == '') {
        responseData.code = 2;
        responseData.message = "注册密码不能为空"
        res.json(responseData);
        return
    }
    if (regPassword.trim() !== checkPassword.trim()) {
        responseData.code = 3;
        responseData.message = "两次密码不一致"
        res.json(responseData);
        return
    }

    db.query(`SELECT username FROM user_table WHERE username='${regUserName}'`, (err, result) => {
        if (err) throw err;
        if (result.length != 0) {
            responseData.code = 4;
            responseData.message = '用户名已经存在'
            res.json(responseData)
        } else {
            var hash = bcrypt.hashSync(regPassword, 8);
            db.query(`INSERT INTO user_table(username,userpass) VALUES('${regUserName}','${hash}')`, (err, result) => {
                if (err) throw err;
                // console.log(result);
                responseData.code = 0;
                responseData.message = '注册成功'
                res.json(responseData)
            });

        }
    });
})

router.post('/login', (req, res) => {
    let { logUserName, logPassword } = req.body;
    if (logUserName.trim() == "") {
        responseData.code = 1;
        responseData.message = "登录用户名不能为空";
        res.json(responseData);
        return;
    }
    if (logPassword.trim() == "") {
        responseData.code = 2;
        responseData.message = "登录密码不能为空";
        res.json(responseData);
        return;
    }
    db.query(`SELECT username,userpass FROM user_table WHERE username='${logUserName}' `, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            responseData.code = 3;
            responseData.message = "用户名或密码有误";
            res.json(responseData);
        } else {
            /* console.log(result); */
            var checkpass = bcrypt.compareSync(logPassword, result[0].userpass);
           if (checkpass) {
               responseData.code=0;
               responseData.message = "登录成功";
               responseData.logname=logUserName
               res.json(responseData);
           } else {
            responseData.code = 4;
            responseData.message = "密码错误";
            res.json(responseData);
           }
        }
    }
    );
});

module.exports = router;