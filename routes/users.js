const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


const User = require('../models/user');
const Order = require('../models/order');
const Option = require('../models/option');

// routers
router.post('/register',(req,res,next)=>{
	let newUser = new User({
		name: req.body.Username,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
    PhoneNo  :req.body.PhoneNo,
    RegistrationNo  :req.body.RegistrationNo,
    RoomNo  :req.body.RoomNo
	});
  console.log(this.newUser);

	User.addUser(newUser, (err, user)=>{
		if(err){
			res.json({success:false, msg:'Failed to register user '+newUser.name});
		}else{
			res.json({success:true, msg:'User Registered'});
		}
	})


	// res.send("register");
});

router.post('/addorder',(req,res,next)=>{
  let newOrder= new Order({
    count: req.body.count,
    orders: req.body.orders
  });
  // console.log(this.newOrder.count);
  console.log("its here in post" +newOrder);

  Order.addOrder(newOrder,(err, order)=>{
    if(err){
      res.json({success:false, msg:'Failed to add order '+newOrder.count});
    }else{
      res.json({success:true, msg:'Order Added'});
    }
  })
});

// auth
router.post('/authenticate',(req,res,next)=>{
	const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {

      if(err) throw err;
      if(isMatch){
        
        const token = jwt.sign(user.toObject(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
  });


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/getorders',  (req, res, next) => {
  Order.getOrders((err, order)=>{
    // return res.json({success: true, msg: 'orders'});
    return res.json(order);

  });
});

router.get('/getoptions',  (req, res, next) => {
  Option.getOptions((err, order)=>{
    // return res.json({success: true, msg: 'orders'});
    return res.json(order);

  });
});






module.exports = router;
