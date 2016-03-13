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


widgets.controller('PhotosCtrl', ['$scope', function($scope){

  $scope.rawFeed = instagramResponse;
  $scope.photosPerPage = 12;
  $scope.currentPage = 1;
  $scope.selectedUser = '';
  $scope.selectedFilter = '';
  $scope.selectedTags = [''];
  $scope.displayImages = $scope.rawFeed.data;

  // Update the pagesArr whenever displayImages changes, this updates
  // pagination in the view so we're not showing page 2 when there is only
  // one page of results.

  // Ran into issue here just watching displayImages itself.  Since displayImages
  // is assigned in the ng-repeat directive, its being updated by the digest loop
  // which then fires this $watch and logs rootScope:infdig error to console
  $scope.$watch('displayImages.length', function() {
    var pages = [];
    var pageCount = Math.ceil($scope.displayImages.length / $scope.photosPerPage);
    for (var i=1; i<=pageCount; i++){
      pages.push(i);
    }
    $scope.pagesArr = pages;
  });

  $scope.changePage = function(pageNum){
    $scope.currentPage = pageNum;
    $scope.offset = (pageNum - 1) * $scope.photosPerPage;
  };

  // setup allFilters and allHashtags from the rawFeed
  var init = function() {
    $scope.allFilters = {"All": ''};
    $scope.allHashtags = {"All": ''};
    $scope.allUsers = {};

    $scope.rawFeed.data.forEach(function(image){

      // gather unique filters
      if ( !(Object.keys($scope.allFilters).includes(image.filter)) ) {
        $scope.allFilters[image.filter] = image.filter;
      }

      // gather unique hashtags
      image.tags.forEach(function(tag){      
        if ( !(Object.keys($scope.allHashtags).includes(tag)) ) {
          $scope.allHashtags[tag] = tag;
        }
      });

      if ( !(Object.keys($scope.allUsers).includes(image.user.username)) ) {
        $scope.allUsers[image.user.username] = {
          username: image.user.username,
          fullName: image.user.full_name
        };
      }

    });
  };

  init();

}]);


widgets.filter('filterHashtags', function(){

  return function( collection, selectedTags ){
    if( !selectedTags || !selectedTags[0] ){ return collection; }

    var filtered = [];

    collection.forEach(function( image ){
      if ( selectedTags.every( function(tag){
        return image.tags.includes(tag);
      }) ) {
        filtered.push(image);
      }
    });
    return filtered;
  };
});