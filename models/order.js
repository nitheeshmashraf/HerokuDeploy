const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const OrderSchema = mongoose.Schema({
  "count": {
    type: String
  },
  "orders": {
    type: String
  }
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.getOrderById = function(id, callback){
  Order.findById(id, callback);
}

module.exports.getOrders = function(callback){
  Order.find(callback);
}

module.exports.addOrder = function(newOrder, callback){
  console.log("its here in export"+newOrder);
  		
      newOrder.save(callback);
    
}


