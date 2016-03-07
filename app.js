var widgets = angular.module('widgets', []);


widgets.controller('RestaurantCtrl', ['$scope', function($scope){

  $scope.restaurants = 
    [
      {
        name: "Teddys",
        foodType: "Pizza",
        photo: "http://product-images.imshopping.com/nimblebuy/teddyspizzarestaurant20worthoffoodfor10-1-1128242-regular.jpg"      
      },
      {
        name: "Taipei Express",
        foodType: "Chinese",
        photo: "http://s3-media1.fl.yelpcdn.com/bphoto/bWrhdcNBELthyXgJQFiN5Q/o.jpg"
      },
      {
        name: "Bojangles",
        foodType: "Fried Chicken",
        photo: "https://media.glassdoor.com/o/8648/bojangles-office.jpg"
      }
    ];

  $scope.createRestaurant = function(){
    $scope.restaurants.push(
      {name: $scope.name, foodType: $scope.type, photo: $scope.photo}
    );
    $scope.name = '';
    $scope.type = '';
    $scope.photo = '';
  };
  
  $scope.deleteRestaurant = function(idx){
    $scope.restaurants.splice(idx, 1);
  };
}]);