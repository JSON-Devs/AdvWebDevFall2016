(function() {

    'use strict';
    angular
        .module('app.employee')
        .controller('EmployeeHomeController', EmployeeHomeController);

    EmployeeHomeController.$inject = ['EmployeeService', '$window'];
    
    function EmployeeHomeController(EmployeeService, $window) {
        var vm = this;

        vm.employees = [];
        vm.deleteEmployee = deleteEmployee;
        vm.message = '';
        
        activate();

        ////////////
        
        function activate() {
            
            getEmployees();
            
        }   
        
        function getEmployees() {
            EmployeeService.getEmployees()
                .then(function(data) {
                    vm.employees = data;
                });
        }
        
        function deleteEmployee(_id) {
            var confirm = $window.confirm('are you sure?');
            if ( confirm ) {
                EmployeeService.deleteEmployee(_id)
                    .then(function(msg) {
                         vm.message = msg;
                         getEmployees();
                    });
            }
        }
       
    }
    /*
    function formatDate(dateString){
        var date = new Date(dateString);
        var d = date.getDate();
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var m = monthNames[date.getMonth()];
        var y = date.getFullYear();
        var output = m + ' ' + d + ' ' + y;
        return output;
    }
 */
})();