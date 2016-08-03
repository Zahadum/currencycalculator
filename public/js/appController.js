//Controller 
var currencyCalculatorApp = angular.module('currencyCalculatorApp',[]);
currencyCalculatorApp.controller('CurrencyCalculatorCtrl',function($scope,$http,$q,dataInitialize) {

	var baseURL='http://openexchangerates.org/api/';
	//this app Id is exceeded limitation
	//var appId = 'ab238a0d483b4746bb17057e063e27ea';
	//new app Id
	var appId = '495cd7e009534bf887c4c914d58f7df7';
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
	$scope.graphData = {};
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
	var dateRangeStart = new Date();
	var dateRangeEnd = dateRangeStart;
	var requestURL = baseURL + lastestURL + '?app_id=' + appId;
	var requestBasedOnDateURL1 = baseURL + 'historical/2016-08-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL2 = baseURL + 'historical/2016-07-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL3 = baseURL + 'historical/2016-06-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL4 = baseURL + 'historical/2016-05-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL5 = baseURL + 'historical/2016-04-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL6 = baseURL + 'historical/2016-03-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL7 = baseURL + 'historical/2016-02-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL8 = baseURL + 'historical/2016-01-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL9 = baseURL + 'historical/2015-12-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL10 = baseURL + 'historical/2015-11-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL11 = baseURL + 'historical/2015-10-01.json' + '?app_id=' + appId;
	var requestBasedOnDateURL12 = baseURL + 'historical/2015-09-01.json' + '?app_id=' + appId;

	$scope.ratesOfDates = [];

	//
	$scope.getRatesOfDates = function() {
		var urls = [];
		urls.push(requestURL);
		urls.push(requestBasedOnDateURL12);
		urls.push(requestBasedOnDateURL11);
		urls.push(requestBasedOnDateURL10);
		urls.push(requestBasedOnDateURL9);
		urls.push(requestBasedOnDateURL8);
		urls.push(requestBasedOnDateURL7);
		urls.push(requestBasedOnDateURL6);
		urls.push(requestBasedOnDateURL5);
		urls.push(requestBasedOnDateURL4);
		urls.push(requestBasedOnDateURL3);
		urls.push(requestBasedOnDateURL2);
		urls.push(requestBasedOnDateURL1);
		
		dataInitialize.loadDataFromUrls(urls)
			.then(function(ratesOfDates) {
				var results = [];
				results = angular.fromJson(ratesOfDates);
				$scope.latestRates = results[0].data.rates;
				$scope.ratesDataRange = results;

				$scope.yenToUSD = 1000 / $scope.latestRates.JPY;
				$scope.yenToCAD = $scope.yenToUSD * $scope.latestRates.CAD;
				$scope.yenToVND = $scope.yenToUSD * $scope.latestRates.VND;
				$scope.customizeYenToUSD = $scope.deposit / $scope.latestRates.JPY;
				$scope.convertedAmount = $scope.customizeYenToUSD * $scope.latestRates.CAD;
				$scope.graphData = $scope.buildGraphData($scope.ratesDataRange);
		var ctx = document.getElementById("myChart").getContext("2d");
		var options = {
		    //String - A legend template
		    scaleLineColor: "white",
		    scaleFontColor: "white",

		    showTooltips: true,
		    multiTooltipTemplate: "<%if (datasetLabel ){%><%=datasetLabel %>: <%}%><%= value %>$",
		    customTooltips: false,
    // String - Template string for single tooltips
    		tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",


		    legendTemplate : "<ul style=\"list-style: none;width: 100px;border: 1px solid gray;\" class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"

		};

		var myLineChart = new Chart(ctx).Line($scope.graphData, options);
		var legend = myLineChart.generateLegend();
		var tmpEle = document.createElement('div');

		var para = document.createTextNode(legend); 
		tmpEle.innerHTML = legend;
		//document.getElementById("myChart").parentNode.appendChild(tmpEle);
		document.getElementById("myChart").parentNode.insertBefore(tmpEle, document.getElementById("myChart").parentNode.firstChild);
		console.log(tmpEle)

			},function(data) {

			});
	};
	
	

	//init function
	$scope.init = function() {
		$scope.getRatesOfDates();
	}

	//init data
	$scope.init();

	//build up rate data for chart
	$scope.buildGraphData = function(datas) {
		var graphData = {};
		graphData.labels = ['2015 SEP','2015 OCT','2015 NOV','2015 DEC','2016 JAN','2016 FEB','2016 MAR','2016 APR','2016 MAY','2016 JUN','2016 JUL','2016 AUG'];
		graphData.datasets = [];
		var datasetUSD = {
			label : 'USD',
			fillColor : "rgba(220,220,220,0.2)",
        	strokeColor : "#FDB45C",
        	pointColor : "#FDB45C",
        	pointStrokeColor : "#fff",
        	pointHighlightFill : "#fff",
        	pointHighlightStroke : "#FDB45C",
        	data : []

		};


		var datasetCAD = {
            label: "CAD",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "#5AD3D1",
            pointColor: "#5AD3D1",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#5AD3D1",
            data : []
		};

		angular.forEach(datas,function(rateData) {
			var yenToUSDTmp = 1000 / rateData.data.rates.JPY;
			datasetUSD.data.push(yenToUSDTmp);
			datasetCAD.data.push(yenToUSDTmp * rateData.data.rates.CAD);
			
		});
		graphData.datasets.push(datasetCAD);
		graphData.datasets.push(datasetUSD);
		
		console.log(graphData);
		return graphData;
	};


});


//Services
currencyCalculatorApp.service('dataInitialize', function($http, $q){
	return {
		loadDataFromUrls: function(urls) {
			var deferred = $q.defer();
			var urlCalls = [];
			angular.forEach(urls, function(url){
				urlCalls.push($http.get(url));
			});
			$q.all(urlCalls)
			.then(
				function(results) {
					deferred.resolve(JSON.stringify(results))
				},
				function(errors) {
					deferred.reject(errors);
				},
				function(updates) {
					deferred.update(updates);
				}
			);				

			return deferred.promise;
		}
	};
});