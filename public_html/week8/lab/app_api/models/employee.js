var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: Date,
    jobTitle: String,
    salary: Number,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

/* This model will also create the collection in the Loc8r database when used */
var Employee = mongoose.model('Employee', employeeSchema);
