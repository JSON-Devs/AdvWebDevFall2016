//Auto function to create anguklar module
(function() {
    'use strict';
    //Create the app angular module
    angular
        .module('app',['ngRoute'])
        .config(config); //Add in config

    config.$inject = ['$routeProvider']; //String name of imported module
    
    
    function config($routeProvider){
        $routeProvider.
            //If the url is '/' load the phone list template
            when('/', {
                templateUrl: 'js/phone-list.template.html',
                controller: 'PhoneListController',
                controllerAs: 'vm'
            }).
            //If the url contains a phoneId, load the phone detail template
            when('/phones/:phoneId', {
                templateUrl: 'js/phone-detail.template.html',
                controller: 'PhoneDetailController',
                controllerAs: 'vm'
            }).
            //Else redirect to '/'
            otherwise({
                redirectTo: '/'
            });
    }
})();


