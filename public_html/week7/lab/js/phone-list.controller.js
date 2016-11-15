//Auto function to create the phone list controller
(function() {
    'use strict';
    //Create the phone list controller angular module
    angular
        .module('app')
        .controller('PhoneListController', PhoneListController); //Make it a contorller

    PhoneListController.$inject = ['PhonesService']; //Imported modules string name
    
    
    function PhoneListController(PhonesService){
        //Controller variable
        var vm = this;
        //Empty phones array for controller
        vm.phones = [];
        //Call the activate function
        activate();
        //Private acivate function
        function activate() {
            //get the phone list then set the view model variable
            PhonesService.getPhones().then(function(response){
                vm.phones = response;
            });
        }
    }
})();