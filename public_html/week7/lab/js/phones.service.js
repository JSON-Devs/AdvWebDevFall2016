//Auto function to create the phone list controller
(function() {
    'use strict';
    //Create the phone detail controller angular module
    angular
        .module('app')
        .factory('PhonesService', PhonesService); //Make it a service

    PhonesService.$inject = ['$http', 'REQUEST']; //Imported module string names
    
    function PhonesService($http, REQUEST){
        //get the url
        var url = REQUEST.Phones;
        //get the service
        var service = {
            'getPhones' : getPhones,
            'findPhone' : findPhone
        };
        return service;
        
        //Get the phones
        function getPhones(){
            //return the results of the callback
            return $http.get(url)
                    .then(getPhoneSuccess, getPhoneFailed);
            
            //private success callback function
            function getPhoneSuccess(response){
                return response.data;
            }
            
            //private failed callback function
            function getPhoneFailed(error){
                return [];
            }
        }
        
        function findPhone(id){
            //return the get phone success function
            return getPhones()
                    .then(function(data){
                       return findPhoneSuccess(data); 
                    });
            function findPhoneSuccess(data){
                //results variable
                var results = {};
                
                //for each phone complete the function
                angular.forEach(data, function(value, key){
                    if(!results.length){
                        if(value.hasOwnProperty('id') && value.id === id){
                            results = angular.copy(value);
                        }
                    }
                }, results);
                //return the phone results
                return results;
            }
        }
    }
})();