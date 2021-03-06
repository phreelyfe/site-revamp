Parse.initialize('p0dYyYK6mD2acO2KzwLBA9x5aQUAfsp5YE3zkMNk', '8jUv8QOggDFGcCAC27UhGuFQ08PPwOaTVjXNyYuK');
Parse.serverURL = 'https://techninja.back4app.io';
let q;
var app = angular.module('app', [
		// 'backand', 
		'auth.service',
		'login.ctrl',
		'ui.router',
		'backend.constants'
	])
  .controller('main', function($scope, $http, CONSTANTS) {
  	window.http = $http;
    $http.defaults.headers.common.anonymousToken = CONSTANTS.anonymousToken;

    $scope.message = "Loaded";
    $scope.appCtrl = $scope;

    var self = this;
    var baseUrl = CONSTANTS.parseURL.custom;

    var objectName = 'Leads';

    self.readAll = function () {
        return $http({
            method: 'GET',
            url: baseUrl + objectName
        }).then(function(response) {
            return response.data.data;
        });
    };

    self.readOne = function (id) {
        return $http({
            method: 'GET',
            url: baseUrl + objectName + '/' + id
        }).then(function(response) {
            return response.data;
        });
    };

    self.create = function (description) {
        return $http({
            method: 'POST',
            url : baseUrl + objectName,
            data: {
                description: description
            },
            params: {
                returnObject: true
            }
        }).then(function(response) {
            return response.data;
        });
    };

    self.update = function (id, data) {
        return $http({
            method: 'PUT',
            url : baseUrl + objectName + '/' + id,
            data: data
        }).then(function(response) {
            return response.data;
        });
    };

    self.delete = function (id) {
        return $http({
            method: 'DELETE',
            url : baseUrl + objectName + '/' + id
        })
    };

    self.signin = function (username, password) {
        return console.log("Backand was replaced and needs rebuilding");
        // return Backand.signin(username, password)
        //     .then(function (response) {
        //         loadUserDetails();
        //         return response;
        //     });
    };

    self.saveForm = function () {
        var inputs = getInputs();
        var l = new (Parse.Object.extend('Leads'))(data);
        l.save(); //.then(()=>toastr.success("Thank You! We've Sent An Email To: " + email));
        
        return inputs;
    };

    self.sendQuote = function ( email, quote ) {
        console.log("Quote", quote);
        // Gather Data By Name
        var data = quote.reduce(function(o, c, i, a){
        	var name = c.name.camelCase().trim();
        	if (c.value >0) o[name] = angular.toJson(c);

        	try {
        		o[name] = parseFloat( o[name] );

        		if (c.hasOwnProperty('checked') && c.checked) o[name] = c.checked;
        		if (!c.hasOwnProperty('checked') && !c.checked) o[name] = parseFloat(c.value);
        	} catch (e) {
        		o[name] = c.value;
        	}
        	return o;
        }, {});

        data.email = email;
        q = quote;
        console.warn("Data", data);

        // var u = new (Parse.Object.extend('Quotes'))(data);
        // u.save().then(()=>toastr.success("Thank You! We've Sent An Email To: " + email));
        return {email: email, quote: quote};
    };

    self.clearForm = function() {
    	clearForm();
    }

    angular.extend($scope, self);
  });

app.config(function($stateProvider, $urlRouterProvider, CONSTANTS) {
	// BackandProvider.setAppName(CONSTANTS.appname);
	// BackandProvider.setSignUpToken(CONSTANTS.signupToken);
	// BackandProvider.setAnonymousToken(CONSTANTS.annonymousToken);

	// BackandProvider.runSigninAfterSignup(true);

	// $stateProvider.state('home', {
	// 	abstract: true,
	// 	controller: 'LoginController',
	// 	template: '<div ui-view="home"></div>'
	// })
	// .state('home.index', {
	// 	url: '/',
	// 	views: {
	// 		'home@home': {
	// 			template: '<button class="signIn" ng-click="getLeads()">Sign In</button><br><br><br>'
	// 			 + '<div>{{ message }}</div>',
	// 			controller: 'main'
	// 		}
	// 	}
	// });

	// .state('home.index', {
	// 	url: '/',
	// 	views: {
	// 		'home@home': {
	// 			templateUrl: './app/views/home.tpl.html'
	// 			controller: 'main'
	// 		}
	// 	}
	// });

	$urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, AuthService){
	// console.log("App Running", $rootScope);

	// window.BackAnd = Backand;
	window.AuthService = AuthService;
})
angular.bootstrap(document, [app.name]);
