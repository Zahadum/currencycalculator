//Controller 
var currencyCalculatorApp = angular.module('currencyCalculatorApp',[]);
currencyCalculatorApp.controller('CurrencyCalculatorCtrl',function($scope,$http,$q) {
	var baseURL='http://openexchangerates.org/api/';
	var appId = 'ab238a0d483b4746bb17057e063e27ea';
	var lastestURL = 'latest.json';
	var currenciesURL = 'currencies.json';

	var _convertedAmount = 1000;

	$scope.version='1.0';
	$scope.date = new Date();
	$scope.deposit = 1000;
	$scope.customizeYenToUSD = 0;
	$scope.yenToCAD = 0;
	$scope.convertedAmount = 0;
	$scope.currencyOptions = [{name:'Canadian Dollar', value:'CAD'},{name:'United States Dollar', value:'USD'},{name:'Vietnamese Dong', value:'VND'}];
	$scope.selectedItem = $scope.currencyOptions[0];


	$scope.convertAmount = function() {
		var tmp = 1;
		console.log($scope.selectedItem);
		console.log('123');
		if(angular.isDefined($scope.latestRates)) {
			console.log('1234');
			console.log($scope.customizeYenToUSD);
			$scope.customizeYenToUSD = $scope.deposit / $scope.latestRates.JPY;
			if($scope.selectedItem.value=='CAD') {
				tmp = $scope.customizeYenToUSD * $scope.latestRates.CAD;
			} else if($scope.selectedItem.value=='USD') {
				tmp = $scope.customizeYenToUSD * $scope.latestRates.USD;
			} else if($scope.selectedItem.value=='VND') {
				tmp = $scope.customizeYenToUSD * $scope.latestRates.VND;
			}
			
			
			console.log(tmp);
		}
		$scope.convertedAmount = tmp;
	};

	var requestURL = baseURL + lastestURL + '?app_id=' + appId;
	var requestBasedOnDateURL = baseURL + 'historical/2015-04-09.json' + '?app_id=' + appId;
	$http.get(requestURL).
		success(function(data, status, headers, config){
			$scope.latestRates = data.rates;
			
			console.log($scope.latestRates);
			$scope.yenToUSD = 1000 / $scope.latestRates.JPY;
			$scope.yenToCAD = $scope.yenToUSD * $scope.latestRates.CAD;
			$scope.yenToVND = $scope.yenToUSD * $scope.latestRates.VND;
			$scope.customizeYenToUSD = $scope.deposit / $scope.latestRates.JPY;
			$scope.convertedAmount = $scope.customizeYenToUSD * $scope.latestRates.CAD;
			console.log($scope.yenToUSD);
		}).
		error(function(data, status, hedaers, config){

		});
	/*
	$http.get(requestBasedOnDateURL).
		success(function(data, status, headers, config){
	
			console.log(data.rates);
		}).
		error(function(data, status, hedaers, config){

		});
	*/
	//var promise = $http.get(requestURL);
	//var promise2 = $http.get(requestBasedOnDateURL);
	/*promise.then(function(result) {
			$scope.a = result.data;
			console.log(result);
	});*/
	/*$q.all({
		x : promise,
		y : promise2
	}).then(function(results) {
		$scope.x = results.x.data;
		$scope.y = results.y.data;
		console.log($scope.x);
		console.log($scope.y);
	});*/


});