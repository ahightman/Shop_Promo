app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/promo/new', {
    controller: 'NewPromoCtrl',
    controllerAs: 'vm',
    templateUrl: 'promos/new-promo.html'
  });
}]).controller('NewPromoCtrl', ['$location', 'Promo', 'promoStore', function ($location, Promo, promoStore) {
  var self = this;

  self.promo = Promo();

  self.doneEditing = function () {
    promoStore.add(self.promo);
    self.goToPromos();
  };

  self.cancelEditing = function () {
    self.goToPromos();
  };

  self.goToPromos = function () {
    $location.path('/promos');
  };

}]);
