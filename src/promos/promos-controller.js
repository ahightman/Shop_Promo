
app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    controller: 'PromosCtrl',
    controllerAs: 'vm',
    templateUrl: 'promos/promos.html'
  };

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/promos', routeDefinition);
}]).controller('PromosCtrl', ['promoStore', function(promoStore) {
  var self = this;

  self.all = promoStore.all;

  self.removePromo = promoStore.remove;

}]);
