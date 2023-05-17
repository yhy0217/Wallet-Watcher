const express = require('express');
const router = express.Router();
const model = require('../../../db/models/models');

const getAccountById = function (id) {
    model.find({"expenses._id": `${id}`}, (err, data) => {
        if (err) return null;
        else return data;
    })
}

router.get('/:pageNumber', (req, res) => {
    const {pageNumber} = req.params;
    model.find({username: req.user}).sort({time: -1}).skip((pageNumber - 1)*10).limit(10).exec((err, data) => {
        if (err) {
            res.json({
                code: '1001',
                msg: 'failed to read expenses',
                data: null
            });
        }
        else res.json({
            code: '0000',
            msg: 'successfully read expenses',
            data: data
        })
    });
})

// api for dropping the selected account from db
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const account = getAccountById(id);
    if (!account) {
        res.json({
            code: '1006',
            msg: "failed to delete selected expense",
            data: null
        })
    } else {
        res.json({
            code: '0000',
            msg: "successfully delete selected expense",
            data: account
        })
    }
})

// api for getting the selected account from db
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const account = getAccountById(id);
    if (!account) {
        res.json({
            code: '1007',
            msg: "failed to get selected expense",
            data: account
        })
    } else {
        res.json({
            code: '0000',
            msg: "successfully get selected expense",
            data: account
        })
    }
})

// api for updating selected account in db
router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const callback = (err, data) => {
        if (err) {
            res.json({
                code: '1008',
                msg: "failed to update the selected account information",
                data: null
            })
        } else {
            res.json({
                code: '0000',
                msg: "secussfully update the selected account information",
                data: getAccountById(id)
            })
        }   
    }
    if (!req.body.type || !req.body.amount || !req.body.category) {
        model.updateOne({_id: id}, {$set: req.body}, callback)    
    } else {
        model.updateOne({_id: id}, req.body, callback);
    }
})

module.exports = router;