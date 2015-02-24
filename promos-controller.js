
angular.module('app', []).controller('PromosCtrl', function() {
  var self = this;

  self.all = [];
  self.current = undefined;

  self.createPromo = function () {
    var newVehicle = {
      year: '',
      make: '',
      model: '',
      mileage: '',
      style: '',
      trans: '',
      extcolor: '',
      intcolor: '',
      price: '',


      upgrades: [],

      get total () {
        return newVehicle.upgrades.reduce(function (total, item) {
          return total + item.cost;
        }, 0);
      }
    };

    self.all.push(newVehicle);
    self.current = newVehicle;
  };

  self.editPromo = function (item) {
    self.current = item;
  };

  self.removePromo = function (item) {
    var index = self.all.indexOf(item);

    if (index >= 0) {
      self.all.splice(index, 1);
    }
  };

  self.doneEditing = function () {
    self.current = undefined;
  };

  self.addUpgrade = function (description, cost) {
    self.current.upgrades.push({
      description: description,
      cost: cost
    });
  };

  self.deleteUpgrade = function (item) {
    var index = self.current.upgrades.indexOf(item);

    if (index >= 0) {
      self.current.upgrades.splice(index, 1);
    }
  };

});
