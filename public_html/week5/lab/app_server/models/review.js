var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    department: String,
    startDate: String,
    jobTitle: String,
    salary: String
});


var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;