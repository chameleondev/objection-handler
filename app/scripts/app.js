'use strict';

/**
 * @ngdoc overview
 * @name objectionHandlerApp
 * @description
 * # objectionHandlerApp
 *
 * Main module of the application.
 */
var app = angular
  .module('objectionHandlerApp', [
    'ngAnimate',
    'ui.router',
     'ngTouch'
  ]);

app.config(function($stateProvider,$urlRouterProvider) {
  		
	$urlRouterProvider.otherwise('/');

	$stateProvider

		.state('home',{
			url: '/',
			abstract : true,
			templateUrl : 'views/main-view.html',
			controller : function($scope){

				window.scope = $scope;

				$scope.objection = 'objection1';
		
				$scope.stage = {
					route : 'a',
					step : 1
				};

				$scope.routeA = function(){
					return $scope.stage.route === 'b' || $scope.stage.route === 'c';
				};

				// $scope.test = objectionState.state;
				// $scope.testA = objectionState.changeMe;
				// $scope.testB = objectionState.getState;

				// $scope.objNum = function(){
				// 	return $scope.objection.slice(-1)[0];
				// }


				//add class to objection view depending on what objection is active
				// $scope.$watch('objection',function(newValue,oldValue){
				// 	// console.log('new value: '+newValue);
				// 	// console.log('old value: '+oldValue);

				// 	newValue > oldValue ?  $('.objection').addClass('down').removeClass('up') : 
				// 						   $('.objection').addClass('up').removeClass('down');
				// })

			}
		})

		.state('home.view',{
			url : '',
			views : {
				'speech1@home' : {
					templateUrl : 'views/speech1-view.html'
				},
				'speech2' : {
					templateUrl : 'views/speech2-view.html'
				},
				'speech3' : {
					templateUrl : 'views/speech3-view.html'
				},
				'speech4' : {
					templateUrl : 'views/speech4-view.html'
				},
				'speech5' : {
					templateUrl : 'views/speech5-view.html'
				},
				'speech6' : {
					templateUrl : 'views/speech6-view.html'
				},
				'speech7' : {
					templateUrl : 'views/speech7-view.html'
				},
				'video1@home' : {
					template : '<div class="video video1"></div>'
				},
				'content1@home' : {
					templateUrl : 'views/objection1/content.html'
				},
				'video2@home' : {
					template : '<div class="video video3"></div>'
				},
				'content2@home' : {
					templateUrl : 'views/objection2/content.html'
				},
				'video3@home' : {
					template : '<div class="video video3"></div>'
				},
				'content3@home' : {
					templateUrl : 'views/objection3/content.html'
				},
				'video4@home' : {
					template : '<div class="video video1"></div>'
				},
				'content4@home' : {
					templateUrl : 'views/objection4/content.html'
				},
				'video5@home' : {
					template : '<div class="video video1"></div>'
				},
				'content5@home' : {
					templateUrl : 'views/objection5/content.html'
				},
				'video6@home' : {
					template : '<div class="video video3"></div>'
				},
				'content6@home' : {
					templateUrl : 'views/objection5/content.html'
				},
				'video7@home' : {
					template : '<div class="video video3"></div>'
				},
				'content7@home' : {
					templateUrl : 'views/objection5/content.html'
				},
				'video8@home' : {
					template : '<div class="video video3"></div>'
				},
				'content8@home' : {
					templateUrl : 'views/objection5/content.html'
				},
				'makeChoice@home' : {
					template : '<h1 style="margin: 60px 0 0 0;">Make a choice</h1>'
				}
			}
		});

  });


app.directive('scroller',function($timeout){
	return{
		 restrict : 'A', // E = Element, A = Attribute, C = Class, M = Comment
		 link: function($scope, iElm, iAttrs, controller) {

		 	// myScroll;

		 	$timeout(function(){
		 		window.myScroll = new IScroll('#left-scroll',{ click: true });
		 		// console.log('hello')
		 	},500);
			

			var origHeight = iElm.find('.scroll-window').height();

			iElm.on('click',function(){
				myScroll.refresh();


			});


		}
	};
});


app.directive('speechText',function(){
	return{
		 restrict : 'A', // E = Element, A = Attribute, C = Class, M = Comment
		 link: function($scope, iElm, iAttrs, controller) {

		 	iElm.on('click',function(){

		 		console.log('speech text');

		 		$scope.$apply(function(){

		 			$scope.$parent.objection = iAttrs.chObjection;

			 		iAttrs.chRoute ? $scope.$parent.stage.route = iAttrs.chRoute : false;

			 		

			 		if (iElm.hasClass('small-bubble')) {

			 			$scope.$parent.stage.step = 0;

			 		};


			 	});
	

		 	});

		}
	};
});


app.directive('feedbackModal',function(){
	return{
		 restrict : 'E', // E = Element, A = Attribute, C = Class, M = Comment
		 replace : true,
		 templateUrl: 'views/feedback-modal.html',
		 link: function($scope, iElm, iAttrs, controller) {

		 	iElm.on('click',function(e){
		 		$scope.feedbackPopup = null;
		 		$scope.$apply();
		 	});

		 	iElm.find('.popup-container').on('click',function(e){
		 		e.stopPropagation();
		 	});
		}
	};
});


app.directive('arrowDown',function($timeout){
	return{
		 restrict : 'A', // E = Element, A = Attribute, C = Class, M = Comment
		 link: function($scope, iElm, iAttrs, controller) {

		 	iElm.on('click',function(e){

		 		console.log('hello');

		 		$scope.$parent.stage.step = iAttrs.chStep;
		 		$scope.$parent.stage.route = iAttrs.chRoute;
		 		$scope.$parent.objection = iAttrs.chObjection;

		 		$scope.$apply();

		 		$timeout(function(){

		 			if (iAttrs.chObjection) {

			 			var id = '#'+iAttrs.chObjection;
				 		console.log(id.toString());

				 		myScroll.scrollToElement(id,500);
			 		}

		 		},500)	;

		 	});

		}
	}
});


// app.factory('objectionState',function(){

// 	return {
// 		state : "on",
// 		changeMe : function(){
// 			this.state = "off";
// 			return this.state;
// 		},
// 		getState : function(){
// 			return this.state;
// 		}
// 	}
// })

// app.animate('.objection',function(objectionState){
// 	return {
// 		add : function(element,done){
// 			element.remove();
// 			console.log(objectionState)
// 		},
// 		remove : function(element,done){

// 		}
// 	}
// });

