var Product = require('../models/product');

module.exports.home = function(req, res){

	var msg = '';
	function successCB(){
		res.render('index', {
			title: 'Add an Product',
			message : 'Product Saved'
		});
	}
	if (req.method === 'POST') {
		console.log(req.body);

		Product.create({
			product: req.body.product,
			description: req.body.description,
			price: req.body.price
		},function (err) {
			// saved!
			successCB();
		});

	} else {
		res.render('index', {
			title: 'Add an Product',
			message : msg
		});
	}


};

module.exports.view = function(req, res){

	var id = req.params.id,
		removed = '';

	function finish() {
		Product
			.find()
			.exec(function(err, results){

				res.render('view', {
					title: 'View Products',
					results : results,
					removed : removed
				});
			});
	}

	if ( id ) {

		var removePromise = new Promise(
			function (resolve, reject) {

				Product.remove({ _id: id }, function (err) {
					if (!err) {
						resolve(' has been removed'); // success
					} else {
						reject(' has not been removed'); // failure
					}
				});

			});


		removePromise.then(function(result) {
			removed = id + result;
			finish();
		}, function(result) {
			removed = id + result;
			finish();
		});


	} else {
		finish();
	}



};



module.exports.update = function(req, res){

	var id = req.params.id;
	var msg =  "";
	if (req.method === 'POST') {

		id = req.body._id;
		var query = { '_id': req.body._id };
		var update = {
			product: req.body.product,
			description: req.body.description,
			price: req.body.price
		};
		var options = {};
		var callback = function(){
			msg = "Product info has been updated";
		};
		Product.update(query, update, options, callback);
	}


	Product
		.findOne({ '_id': id })
		.exec(function(err, results){

			if ( results ) {
				res.render('update', {
					title: 'Update Products',
					message: msg,
					results : results
				});
			} else {
				res.render('notfound', {
					message: 'Sorry ID not found'
				});
			}

		});
};


