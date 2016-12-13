var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	product: String,
	description: String,
	price: String
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;