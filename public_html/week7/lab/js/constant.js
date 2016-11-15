//Auto function to create the constant
(function() {
    'use strict';
    //Create the phone detail controller angular module
    angular
        .module('app')
        //Make it a constant
        .constant('REQUEST', {
            //Connect to the phones json file
            'Phones' : './data/phones.json'
        }); 
})();