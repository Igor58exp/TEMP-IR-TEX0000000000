var App = angular.module('App', ['ngRoute', 'ngAnimate']);
App.config(function($routeProvider) {
	$routeProvider.
		when('/home',     {templateUrl:'home.html'    ,controller:'homeCtrl'}).
		when('/about',    {templateUrl:'about.html'   ,controller:'aboutCtrl'}).
		when('/services', {templateUrl:'services.html',controller:'servicesCtrl'}).
		when('/contacts', {templateUrl:'contacts.html',controller:'contactsCtrl'}).
			otherwise({redirectTo: '/home'});
});
App.controller('indexController',function($scope){
    $scope.active='home';
});
App.controller('homeCtrl',		 function($scope,$interval,servicesData){
	$scope.servicesInclude = servicesData;
	$scope.includes=['ad1','ad2','ad3','ad4'];
    $scope.currentSlide='0';
	$scope.slide=$scope.includes[$scope.currentSlide]+'.html';
    var promise;
    //slider animation fn--------------------------------------------------
    $scope.animate=function(){
        $scope.currentSlide++;
        if ($scope.currentSlide==$scope.includes.length){
            $scope.currentSlide=0;  
        };
        $scope.slide=$scope.includes[$scope.currentSlide]+'.html';
    };
    
    //interval reset fn------------------------------------------------------
    $scope.stop=function(){
        $interval.cancel(promise);
    };
    // inrerval run fn---------------------------------------------------------
    $scope.slideAnimation=function(){
        $scope.stop(); 
        promise=$interval($scope.animate,5000);
    };
    $scope.slideAnimation();
    
    //destroy scope and interval fn--------------------------------------------
    $scope.$on('$destroy',function(){
        promise=undefined;
    });
});
App.controller('aboutCtrl',    	 function($scope){  
	
});
App.controller('servicesCtrl',	 function($scope,servicesData){
    $scope.servicesInclude = servicesData;
});
App.controller('contactsCtrl',	 function($scope){
	
});
App.service('servicesData', 	 function () {
	var sharedData = this;
	sharedData.templatePage = 'electro.html';
	sharedData.sActive = 'electro';
});
