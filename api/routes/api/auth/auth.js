const express = require('express');
// encyrpt password
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require('../../../db/models/models');
const {SECRET} = require('../../../config/config');

router.post('/signup', (req, res) => {
    // form check
    userModel.create({...req.body, password: md5(req.body.password)}).then((data) => {
        return res.json({
            code: '0000',
            msg: 'successfully sign up',
            data: data
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            code: '2001',
            msg: 'failed to sign up',
            data: null
        });
    })
});

router.post('/login', (req, res) => {
    let {username} = req.body;
    userModel.findOne({username: username}).then((data) => {
        if (!data) {
            return res.json({
                code: '2003',
                msg: "failed to login; wrong username or password",
                data: null
            })
        } else {
            /** register token */
            const token = jwt.sign({
                ...req.body
            }, SECRET, {
                expiresIn: 7*24*3600
            });
            return res.json({
                code: '0000',
                msg: "successfully login",
                data: token
            })
        }
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            code: '2002',
            msg: 'failed to login; internal server error',
            data: null
        })
    })
})

module.exports = router;