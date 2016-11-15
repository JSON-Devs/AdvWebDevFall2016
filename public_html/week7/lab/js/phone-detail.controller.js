//Auto function to create the phone list controller
(function() {
    'use strict';
    //Create the phone detail controller angular module
    angular
        .module('app')
        .controller('PhoneDetailController', PhoneDetailController); //Make it a contorller

    PhoneDetailController.$inject = ['$routeParams', 'PhonesService']; //Imported module string names
    
    
    function PhoneDetailController($routeParams, PhonesService){
        //Controller variable
        var vm = this;
        //phone variable for controller
        vm.phone = {};
        //get the phoneId and store it
        var id = $routeParams.phoneId;
        
        //Call the activate function
        activate();
        //Private acivate function
        function activate() {
            //get the phone by id then set the view model variable
            PhonesService.findPhone(id).then(function(response){
                vm.phone = response;
            });
        }
    }
})();