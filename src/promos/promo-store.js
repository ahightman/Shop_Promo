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
