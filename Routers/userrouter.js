const express=require('express');
const router=express.Router();

const users=require('../Controllers/usercontroller');

router.post('/signup',users.signup);
router.post('/login',users.login);

module.exports={router};  