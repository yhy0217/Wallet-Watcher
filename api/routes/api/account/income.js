const model = require("../../../db/models/models");
const express = require('express');
const { route } = require("./expense");
const router = express.Router();

router.get('/', (req, res) => {
    model.find({username: req.user}).sort({date: -1}).limit(10).exec((err, data) => {
        if (err) {
            res.json({
                code: '1001',
                msg: 'failed to read incomes',
                data: null
            });
        }
        else res.json({
            code: '0000',
            msg: 'successfully read incomes',
            data: data
        })
    });
})

// front-end should make the delete button as a link, will direct the website to /account/:id
router.get('/:id', (req, res) => {
    model.find({"incomes._id": `${id}`}, (err, data) => {
        if (err) {
            res.json({
                code: '1006',
                msg: 'failed to delete selected income',
                data: null
            });
        }
        else res.json({
            code: '0000',
            msg: 'successfully delete selected income',
            data: data
        })
    })
})

module.exports = router;