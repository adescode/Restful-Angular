angular
 .module("myShoppingList", [])
  .controller("myCtrl", ['$http', function($http) {
 var self = this;
 self.name={};
 self.book = [];
 var books = function(){
  $http.get('/api/book')
   .then(function(response){
   self.book = response.data;
  }, function(responseError){
   console.log('Cant load book list');
  })
 };
 
   books();
   
 self.addItem = function(){
  if(!self.name.title){
   return;
  }
  console.log(self.name);
  $http.post('api/book', self.name)
   .then(function(response){
    var name = response.data;
    console.log(name);
   }, function(responseError){
    console.log('cant pass info');
   })
  .then(books)
  .then(function () {
   self.name = {};
  });
 };
 
 self.removeItem = function(id, title){
  var book ={id:id,title:title};
  console.log(book);
  $http.post('/api/change', book)
   .then(function(response){
    var name = response.data;
    console.log(name);
   }, function(responseError){
    console.log('cant get info');
  })
   .then(books)
 }

}]);