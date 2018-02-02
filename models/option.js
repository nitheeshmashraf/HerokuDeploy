const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const OptionSchema = mongoose.Schema({
  "optionType": {
    type: String
  },
  "foption": {
    type: String
  },
  "constring":{
    type:String
  }
});

const Option = module.exports = mongoose.model('Option', OptionSchema);

// module.exports.getOrderById = function(id, callback){
//   Order.findById(id, callback);
// }

// module.exports.getOrders = function(callback){
//   Order.find(callback);
// }

// module.exports.addOrder = function(newOrder, callback){
//   console.log("its here in export"+newOrder);
  		
//       newOrder.save(callback);
    
// }

module.exports.getOptions = function(callback){
  Option.find(callback);
}
