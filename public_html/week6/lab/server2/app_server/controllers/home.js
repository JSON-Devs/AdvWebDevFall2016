
var request = require('request');



module.exports.homePage = function(req, res) {
        
    var requestOptions = {
          url : 'http://localhost:3001/api/v1/employees',
          method : "GET",
          json : {},
          qs : {}
        };
        
  request( requestOptions, function(err, response, body) {
      var results = [];
      if (response.statusCode === 200 && body.length) {
        results = (body instanceof Array) ? body : [];        
      }
      
      res.render('index', {
            title: 'Home Page',
            results: results
        });
      
    }
  );
    
   
};

module.exports.formPagePost = function(req, res) {
        
    var memes = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                department: req.body.department,
                startDate: req.body.startDate,
                jobTitle: req.body.jobTitle,
                salary: req.body.salary
          }
        
    var requestOptions = {
          url : 'http://localhost:3001/api/v1/employees',
          method : "POST",
          json : memes,
          qs : {}
        };
    console.log("========");
    console.log(memes);
  request( requestOptions, function(err, response, body) {
      console.log(body);
      var results = [];
      if (response.statusCode === 200 && body.length) {
        results = (body instanceof Array) ? body : [];        
      }
      console.log(results);
      
      res.redirect("/");
      
    }
  );
};

module.exports.formPageGet = function(req, res) {
    res.render('form', {
        title: 'Add an Employee Page'
    });
};