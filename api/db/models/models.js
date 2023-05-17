// create and export the model the collections

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema ({
    type: {
      type: String,
      enum: ['Expense', 'Income'],
      require: true
    },
    title: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    amount: {
      type: Number,
      require: true
    },
    category: {
      type: String,
      enum: ['Grocery', 'Transportation', 'Shopping', 'Housing', 'Others'],
      require: true
    },
    desc: String
});

const incomeSchema = new mongoose.Schema ({
    type: {
      type: String,
      enum: ['Expense', 'Income'],
      require: true
    },
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        enum: ['Salary', 'Investment', 'Others'],
        require: true
    },
    desc: String
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  expenses: expenseSchema,
  incomes: incomeSchema
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;