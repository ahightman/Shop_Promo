// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'errors/404/error-404.html'
  });
}]);

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

app.factory('promoStore', function () {
  var promos = [];

  return {
    all: function () {
      return promos;
    },

    add: function (promo) {
      promos.push(promo);
    },

    remove: function (promo) {
      var index = promos.indexOf(promo);

      if (index >= 0) {
        promos.splice(index, 1);
      }
    }
  };

});

app.factory('Promo', function () {
  return Promo;

  function Promo (spec) {
    spec = spec || {};

    var self = {
      year: spec.year || '',
      make: spec.make || '',
      model: spec.model || '',
      mileage: spec.mileage || '',
      style: spec.style || '',
      trans: spec.trans || '',
      extcolor: spec.extcolor || '',
      intcolor: spec.intcolor || '',
      price: spec.price || 0,

      upgrades: spec.upgrades || [Upgrade()],

      get total () {
        return self.upgrades.reduce(function (total, item) {
          return total + item.cost;
        }, Number(self.price));
      },

      addUpgrade: function (description, cost) {
        self.upgrades.push(Upgrade({
          description: description,
          cost: cost
        }));
      },

      deleteUpgrade: function (item) {
        var index = self.upgrades.indexOf(item);

        if(index >= 0) {
          self.upgrades.splice(index, 1);
        }
        if(!self.upgrades.length) {
          self.upgrades.push(Upgrade());
        }
      }
    };

    return self;
  }

  function Upgrade (spec) {
    spec = spec || {};

    return {
      description: spec.description || '',
      cost: spec.cost || 0,
    };
  }

});


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

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

//# sourceMappingURL=app.js.map