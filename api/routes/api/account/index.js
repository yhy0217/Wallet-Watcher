var express = require('express');
var moment = require('moment');
var router = express.Router();
// var formidable = require('formiable');
var {expenseModel, incomeModel} = require('../../../db/models/models');
var authMiddleware = require('../../../middlewares/authenticateApiMiddleware');
var expenseRouter = require('./expense');
var incomeRouter = require('./income');
const userModel = require('../../../db/models/models');

router.use(authMiddleware);

router.use('/expense', expenseRouter);

router.use('/income', incomeRouter);

/* api for adding new account */
router.post('/newAccount', function (req, res) {
    // express frame has already use middlewares to parse the
    // request body (body-parser) and the data to property req.body
    let {type, title, date, amount, category, desc} = req.body;
    // handle invalid inputs
    if (!type || !(['Expense','Income'].includes(type))) {
        return res.json({
            code: '1003',
            msg: 'failed to create a new expense account; wrong or missing type information',
            data: null
        })
    } else if (!title) {
        return res.json({
            code: '1004',
            msg: 'failed to create a new expense account; missing title information',
            data: null
        })
    } else if (!amount) {
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
    // db.collection.find returns **a Cursor** which is A pointer to the result set of a query. 
    // Clients can iterate through a cursor to retrieve results
    const newAccount = {
        ...req.body,
        date: date ? moment(req.body.date).format('YYYY-MM-DD') : null
    };
    type = type.toLowerCase();
    let update = {};
    update[type + 's'] = newAccount;
    userModel.findOneAndUpdate({username: req.user.username}, {'$push': update}, {new: true}).then(data => res.json({
        code: '0000',
        msg: `a new ${type} account has been successfully created`,
        data: data
    })).catch(err => res.json({
        code: '1001',
        msg: `failed to create a new ${type} account`,
        data: null
    }));
});
module.exports = router;