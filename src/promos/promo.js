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
