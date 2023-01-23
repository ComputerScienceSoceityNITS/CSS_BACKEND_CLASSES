const express=require('express');
const router=express.Router();
const blogs=require('../Controllers/blogcontroller');


router.get('/allblogs',blogs.fetchAllBlogs);
router.post('/addBlog',blogs.addBlog);
router.put('/editBlog',blogs.updateBlog);
router.delete('/deleteBLog',blogs.deleteBlog); 

module.exports={router};