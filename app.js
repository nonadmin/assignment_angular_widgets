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

  $scope.displayImages = $scope.rawFeed.data;

  // Update the pagesArr whenever displayImages changes, this updates
  // pagination in the view so we're not showing page 2 when there is only
  // one page of results.
  $scope.$watch('displayImages', function() {
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

  $scope.allFilters = (function(){
    var filters = {"All": ''};    
    $scope.rawFeed.data.forEach(function(image){
      if ( !(Object.keys(filters).includes(image.filter)) ) {
        filters[image.filter] = image.filter;
      }
    });
    return filters;
  })();

  $scope.allHashtags = (function(){
    var hashtags = {"All": ''};
    $scope.rawFeed.data.forEach(function(image){
      image.tags.forEach(function(tag){      
        if ( !(Object.keys(hashtags).includes(tag)) ) {
          hashtags[tag] = tag;
        }
      });
    });
    return hashtags;
  })();

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