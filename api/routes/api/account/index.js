var express = require('express');
var moment = require('moment');
var router = express.Router();
// var formidable = require('formiable');
var {expenseModel, incomeModel} = require('../../../db/models/models');
var authMiddleware = require('../../../middlewares/authenticateApiMiddleware');
var expenseRouter = require('./expense');
var incomeRouter = require('./income');

router.use(authMiddleware);

router.use('/expense', expenseRouter);

router.use('/income', incomeRouter);

/* api for adding new account */
router.post('/newAccount', function (req, res) {
    // express frame has already use middlewares to parse the
    // request body (body-parser) and the data to property req.body
    const {type, date, amount, category, desc} = req.body;
    // handle invalid inputs
    if (!type || !(['Expense','Income'].includes(type))) {
        return res.json({
            code: '1003',
            msg: 'failed to create a new expense account; wrong or missing type information',
            data: null
        })
    } else if (!amount || typeof amount !== Number) {
        return res.json({
            code: '1004',
            msg: 'failed to create a new expense account; wrong or missing amount information',
            data: null
        })
    } else if (!category || !(['Grocery', 'Transportation', 'Shopping', 'Housing', 'Others'].includes(category))) {
        return res.json({
            code: '1005',
            msg: 'failed to create a new expense account; wrong or missing category information',
            data: null
        })
    }

    if (type === 'Expense') {
        expenseModel.create({
            ...req.body,
            date: date ? moment(req.body.date).format('YYYY-MM-DD') : null
        }, (err, data) => {
            if (err) {
                res.json({
                    code: '1002',
                    msg: 'failed to create a new expense account',
                    data: null
                })
            } else {
                res.json({
                    code: '0000',
                    msg: 'a new expense account has been successfully created',
                    data: data
                })
            }
        })
    } else {
        incomeModel.create({
            ...req.body,
            date: moment(req.body.date).toDate()
        }, (err, data) => {
            if (err) {
                res.json({
                    code: '1002',
                    msg: 'failed to create a new income account',
                    data: null
                })
            } else {
                res.json({
                    code: '0000',
                    msg: 'a new income account has been successfully created',
                    data: data
                })
            }
        });
    }
})

module.exports = router;