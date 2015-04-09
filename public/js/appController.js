//Controller 
var currencyCalculatorApp = angular.module('currencyCalculatorApp',[]);
currencyCalculatorApp.controller('CurrencyCalculatorCtrl',function($scope,$http) {
	var baseURL='http://openexchangerates.org/api/';
	var appId = 'ab238a0d483b4746bb17057e063e27ea';
	var lastestURL = 'latest.json';
	var currenciesURL = 'currencies.json';
	
	$scope.version='1.0';
	$scope.date = new Date();

	var requestURL = baseURL + lastestURL + '?app_id=' + appId;
	$http.get(requestURL).
		success(function(data, status, headers, config){
			$scope.latestRates = data.rates;
			console.log($scope.latestRates);
			$scope.yenToUSD = 1000 / $scope.latestRates.JPY;
			$scope.yenToCAD = $scope.yenToUSD * $scope.latestRates.CAD;
			console.log($scope.yenToUSD);
		}).
		error(function(data, status, hedaers, config){

		});
});